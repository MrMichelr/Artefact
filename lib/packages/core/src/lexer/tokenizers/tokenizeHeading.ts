import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a heading in the lexer stream.
 * 
 * Headings start with one to five asterisks (*) followed by a space and content.
 * The number of asterisks determines the heading level (1-5).
 * 
 * @param lexer The lexer instance to tokenize from
 * @returns A Token object representing the heading
 */
export function tokenizeHeading(lexer: Lexer, startColumn: number): Token {
    let level = 0;
    
    // Count asterisks
    while (lexer.peek() === '*' && level < 6) {
        lexer.advance();
        level++;
    }

    // Check for valid heading level
    if (level < 1 || level > 6) {
        lexer.throwError(`Invalid heading level: ${level}`);
    }

    if (lexer.peek() !== ' ') {
        lexer.throwError(`Expected space after heading stars`);
    }
    lexer.advance(); // Consume the space

    // Collect heading content
    let content = '';
    while (!lexer.isAtEnd() && lexer.peek() !== '\n') {
        content += lexer.advance();
    }

    // Consume the newline character
    if (lexer.peek() === '\n') {
        lexer.advance();
    }

    return lexer.createToken(TokenType.HEADING, content.trim(), { 
        level, 
        column: startColumn 
    });
}