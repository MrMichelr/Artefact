import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a comment in the lexer stream.
 * 
 * Comments start with // and continue until the end of the line.
 * 
 * @param lexer The lexer instance to tokenize from
 * @returns A Token object representing the comment
 */
export function tokenizeComment(lexer: Lexer, startColumn?: number): Token {
    lexer.advance(); // Skip the first '/'
    lexer.advance(); // Skip the second '/'

    let content = '';

    while (!lexer.isAtEnd() && lexer.peek() !== '\n') {
        content += lexer.advance();
    }
    return lexer.createToken(TokenType.COMMENT, content.trim(), { 
        column: startColumn
    });
}