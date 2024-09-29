import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a meta tag in the lexer stream.
 * 
 * Meta tags start with -(name) followed by content.
 * The format is: -(name) content
 * 
 * @param lexer The lexer instance to tokenize from
 * @returns A Token object representing the meta tag
 */
export function tokenizeMeta(lexer: Lexer, startColumn?: number): Token {
    lexer.advance(); // Skip the /
    lexer.expect(' ')
    lexer.expect('-')
    lexer.expect('(');

    let name = '';
    while (!lexer.isAtEnd() && lexer.peek() !== ')') {
        name += lexer.advance();
    }

    lexer.expect(')');
    lexer.expect(' ');

    let content = '';
    while (!lexer.isAtEnd() && lexer.peek() !== '\n') {
        content += lexer.advance();
    }

    return lexer.createToken(TokenType.META, content.trim(), { name: name.trim(), column: startColumn });
}