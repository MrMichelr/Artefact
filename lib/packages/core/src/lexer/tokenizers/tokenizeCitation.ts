import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a citation in the lexer stream.
 * 
 * Citations can be of two types:
 * 1. Basic citation: Starts with " --
 * 2. Author citation: Starts with " ->
 * 
 * @param lexer The lexer instance to tokenize from
 * @returns A Token object representing the citation
 */
export function tokenizeCitation(lexer: Lexer, startColumn: number): Token {
    lexer.advance(); // Skip the "
    lexer.advance(); // Skip the space
    lexer.expect('-');

    let isAuthor = false;
    if (lexer.peek() === '>') {
        isAuthor = true;
        lexer.advance(); // Skip the >
    } else {
        lexer.expect('-');
    }

    lexer.expect(' ');

    let content = '';

    while (!lexer.isAtEnd() && lexer.peek() !== '\n') {
        content += lexer.advance();
    }

    return lexer.createToken(TokenType.CITATION, content.trim(), { 
        column: startColumn,
        isAuthor
    });
}