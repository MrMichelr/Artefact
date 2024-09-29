import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes plain text in the lexer stream.
 * 
 * This function consumes characters from the lexer until it encounters
 * a special character, a newline, or reaches the end of the input.
 * 
 * @param lexer The lexer instance to tokenize from
 * @param startColumn The starting column of the text token
 * @returns A Token object representing the plain text
 */
export function tokenizeText(lexer: Lexer, startColumn: number): Token {
    let value = '';

    // Continue consuming characters until we reach a special character
    while (!lexer.isAtEnd() && !lexer.isSpecialChar(lexer.peek())) {
        value += lexer.advance();
    }
    
    if (value.length === 0) {
        value = lexer.advance(); // Consume at least one character if no text was found
    }

    // Create and return a TEXT token with the accumulated value
    return lexer.createToken(TokenType.TEXT, value, {
        column: startColumn
    });
}