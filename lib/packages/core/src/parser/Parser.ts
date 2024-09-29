/**
 * This file defines the Parser class, which is responsible for parsing tokens into an Abstract Syntax Tree (AST).
 * It imports necessary types, modules, and parsing functions for different token types.
 */

import { TokenType } from '../lexer/TokenType';
import { Document, ASTNode } from './ASTNode';
import { ParserError } from './ParserError';
import Lexer from '../lexer/Lexer';
import { Token } from '../lexer/Token';

// Import parsing functions for different token types
import { parseHeading } from './parsers/parseHeading';
import { parseText } from './parsers/parseText';
import { parseLink } from './parsers/parseLink';
import { parseImage } from './parsers/parseImage';
import { parseCitation } from './parsers/parseCitation';
import { parseComment } from './parsers/parseComment';
import { parseMeta } from './parsers/parseMeta';
import { parseVariableDeclaration } from './parsers/parseVariableDeclaration';
import { parseVariableUse } from './parsers/parseVariableUse';
import { parseAnchor } from './parsers/parseAnchor';

/**
 * The Parser class is responsible for converting a string input or an array of tokens into an AST.
 */
export default class Parser {
  private tokens: Token[];
  private current: number = 0;
  private symbolTable: Map<string, string> = new Map();

  /**
   * Creates a new Parser instance.
   * @param input - Either a string to be lexed or an array of pre-lexed tokens.
   */
  constructor(input: string | Token[]) {
    if (typeof input === 'string') {
      const lexer = new Lexer(input);
      this.tokens = lexer.tokenize();
    } else if (Array.isArray(input)) {
      this.tokens = input;
    } else {
      throw new Error('Parser input must be a string or an array of tokens');
    }
  }

  /**
   * Parses the input and returns a Document AST node.
   * @returns A Document AST node containing all parsed nodes.
   */
  parse(): Document {
    const nodes: ASTNode[] = [];
    while (!this.isAtEnd()) {
      try {
        const node = this.parseNode();
        if (node) {
          nodes.push(node);
        }
      } catch (error) {
        console.error(error);
        this.synchronize();
      }
    }
    return new Document(nodes);
  }

  /**
   * Parses a single node based on the current token type.
   * @returns An AST node.
   * @throws {ParserError} If an unexpected token is encountered.
   */
  private parseNode(): ASTNode | null {
    const token = this.peek();
    if (!token) return null;

    switch (token.type) {
      case TokenType.HEADING:
        return parseHeading(this);
      case TokenType.LINK:
        return parseLink(this);
      case TokenType.IMAGE:
        return parseImage(this);
      case TokenType.CITATION:
        return parseCitation(this);
      case TokenType.COMMENT:
        return parseComment(this);
      case TokenType.META:
        return parseMeta(this);
      case TokenType.VARIABLE_DECLARATION:
        return parseVariableDeclaration(this);
      case TokenType.VARIABLE_USE:
        return parseVariableUse(this);
      case TokenType.ANCHOR:
        return parseAnchor(this);
      case TokenType.TEXT:
        return parseText(this);
      case TokenType.EOF:
        return null;
      default:
        throw new ParserError(`Unexpected token type: ${token.type}`, token.line, token.column);
    }
  }

  /**
   * Checks if the parser has reached the end of the token stream.
   * @returns True if at the end, false otherwise.
   */
  private isAtEnd(): boolean {
    return this.current >= this.tokens.length || this.peek().type === TokenType.EOF;
  }

  addToSymbolTable(name: string, value: string): void {
    this.symbolTable.set(name, value);
  }
  
  isInSymbolTable(name: string): boolean {
    return this.symbolTable.has(name);
  }
  
  getFromSymbolTable(name: string): string | undefined {
    return this.symbolTable.get(name);
  }

  /**
   * Returns the current token without advancing.
   * @returns The current token.
   */
  peek(): Token {
    return this.tokens[this.current];
  }

  /**
   * Advances to the next token and returns the previous one.
   * @returns The previous token.
   */
  advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  /**
   * Returns the previous token.
   * @returns The previous token.
   */
  previous(): Token {
    return this.tokens[this.current - 1];
  }

  /**
   * Synchronizes the parser state in case of an error.
   * Advances until a known token type is found or the end is reached.
   */
  private synchronize(): void {
    this.advance();
    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.EOF) return;
      switch (this.peek().type) {
        case TokenType.HEADING:
        case TokenType.LINK:
        case TokenType.IMAGE:
        case TokenType.CITATION:
        case TokenType.COMMENT:
        case TokenType.META:
        case TokenType.VARIABLE_DECLARATION:
        case TokenType.ANCHOR:
          return;
      }
      this.advance();
    }
  }
}