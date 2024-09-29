/**
 * This file defines the Lexer class, which is responsible for tokenizing input text.
 * It imports necessary types, modules, and tokenization functions for different token types.
 */

import { TokenType } from './TokenType';
import { Token } from './Token';
import { LexerError } from './LexerError';
import { tokenizeHeading } from './tokenizers/tokenizeHeading';
import { tokenizeLink } from './tokenizers/tokenizeLink';
import { tokenizeImage } from './tokenizers/tokenizeImage';
import { tokenizeCitation } from './tokenizers/tokenizeCitation';
import { tokenizeComment } from './tokenizers/tokenizeComment';
import { tokenizeMeta } from './tokenizers/tokenizeMeta';
import { tokenizeVariable } from './tokenizers/tokenizeVariable';
import { tokenizeAnchor } from './tokenizers/tokenizeAnchor';
import { tokenizeText } from './tokenizers/tokenizeText';

/**
 * The Lexer class is responsible for tokenizing input text into a series of tokens.
 * It uses various tokenizer functions to handle different types of tokens.
 */
export default class Lexer {
    /** Array to store the generated tokens */
    private tokens: Token[] = [];
    /** Start position of the current token */
    private start: number = 0;
    /** Current position in the input string */
    private current: number = 0;
    /** Current line number */
    private line: number = 1;
    /** Current column number */
    private column: number = 1;


    /**
     * Creates a new Lexer instance
     * @param input The input string to be tokenized
     * @throws {Error} If the input is not a string
     */
    constructor(private input: string) {
        if (typeof input !== 'string') {
            throw new Error('Lexer input must be a string');
        }
    }

    getLine(): number { return this.line }
    getColumn(): number { return this.column }

    /**
     * Tokenizes the entire input string
     * @returns An array of Token objects
     */
    tokenize(): Token[] {
        const tokens: Token[] = [];

        while (!this.isAtEnd()) {
            this.start = this.current;
            this.skipWhitespace();
            
            try {
                const token = this.scanToken();
                if (token) {
                    tokens.push(token);
                }
            } catch (error) {
                if (error instanceof LexerError) {
                    console.error(`${error.name} at line ${this.line}, column ${this.column}: ${error.message}`);
                    this.synchronize();
                } else {
                    throw error;
                }
            }
            //this.skipWhitespace();
        }
        tokens.push(this.createToken(TokenType.EOF));
        return tokens;
    }

    /**
     * Scans and processes a single token
     */
    private scanToken(): Token | null {
        if (this.isAtEnd()) return null;

        const startColumn = this.column;
        const startLine = this.line;
        const char = this.peek();


        let token: Token | null = null;

        switch (char) {
            case '*':
                token = tokenizeHeading(this, startColumn);
                break;
            case '@':
                token = tokenizeLink(this, startColumn);
                break;
            case '&':
                token = tokenizeImage(this, startColumn);
                break;
            case '"':
                token = tokenizeCitation(this, startColumn);
                break;
            case '/':
                if (this.peekNext() === '/') {
                    token = tokenizeComment(this, startColumn);
                } else {
                    token = tokenizeMeta(this, startColumn);
                }
                break;
            case '$':
                token = tokenizeVariable(this, startColumn);
                break;
            case '±':
                token = tokenizeAnchor(this, startColumn);
                break;
            default:
                token = tokenizeText(this, startColumn);
        }

        if (token) {
            token.line = startLine;
        }

        return token;
    }

    /**
     * Creates a new Token object with the given type and content
     * @param type The type of the token
     * @param content The content of the token
     * @returns A new Token object
     */
    createToken(type: TokenType, content?: string, additionalProps: Record<string, any> = {}): Token {
        const token: Token = {
            type,
            line: additionalProps.line || this.line,
            column: additionalProps.column || this.column,
            ...additionalProps
        };

        if (content !== undefined) {
            token.content = content;
        }

        return token;
    }

    /**
     * Checks if the lexer has reached the end of the input
     * @returns True if at the end, false otherwise
     */
    isAtEnd(): boolean {
        return this.current >= this.input.length;
    }
    /**
     * Checks if a character is alphanumeric.
     * @param char - The character to check.
     * @returns True if it's alphanumeric, false otherwise.
     */
    isAlphaNumeric(char: string): boolean {
        return /^[a-zA-Z0-9]$/.test(char);
    }

    isSpecialChar(char: string): boolean {
        return ['*', '@', '&', '"', '/', '±', '$', '\n', '\r', '\t'].includes(char);
    }

    /**
     * Advances the current position and returns the current character
     * @returns The current character
     */
    advance(): string {
        if (this.isAtEnd()) {
            return '\0';
        }
        const char = this.input.charAt(this.current);
        this.current++;
        if (char === '\n') {
            this.line++;
            this.column = 1;
        } else {
            this.column++;
        }
        return char;
    }

    /**
     * Returns the current character without advancing
     * @returns The current character or '\0' if at the end
     */
    peek(): string {
        if (this.isAtEnd()) {
            return '\0';
        }
        return this.input.charAt(this.current);
    }

    /**
     * Returns the next character without advancing
     * @returns The next character or '\0' if at the end
     */
    peekNext(): string {
        return this.current + 1 >= this.input.length ? '\0' : this.input.charAt(this.current + 1);
    }

    /**
     * Checks if the current character matches the expected character and advances if it does
     * @param expected The expected character
     * @returns True if the character matches and was consumed, false otherwise
     */
    match(expected: string): boolean {
        if (this.isAtEnd() || this.input.charAt(this.current) !== expected) return false;
        this.current++;
        this.column++;
        return true;
    }

    /**
     * Throws a LexerError with the given message
     * @param message The error message
     * @throws {LexerError} Always throws a LexerError
     */
    throwError(message: string): never {
        throw new LexerError(message, this.line, this.column);
    }

    /**
     * Synchronizes the lexer state after encountering an error
     */
    private synchronize(): void {
        this.advance();
        while (!this.isAtEnd() && !this.isSpecialChar(this.peek())) {
            this.advance();
        }
    }

    /**
     * Skips whitespace characters
     */
    private skipWhitespace(): void {
        while (!this.isAtEnd()) {
            const char = this.peek();
            if (char === '\r' || char === '\t') {
                this.advance();
            } else if (char === '\n') {
                this.line++;
                this.column = 1;
                this.advance();
            } else {
                break;
            }
        }
    }

    expect(expected: string): void {
        if (this.isAtEnd()) {
            this.throwError(`Expected '${expected}' but reached end of input`);
        }
        if (this.peek() !== expected) {
            this.throwError(`Expected '${expected}' but found '${this.peek()}'`);
        }
        this.advance();
    }
}
