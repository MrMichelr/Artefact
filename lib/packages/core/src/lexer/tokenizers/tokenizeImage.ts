import Lexer from '../Lexer';
import { TokenType } from '../TokenType';
import { Token } from '../Token';

export function tokenizeImage(lexer: Lexer, startColumn: number): Token {
    lexer.advance(); // Skip the &
    lexer.expect(' ');
    lexer.expect('-');
    lexer.expect('-');
    lexer.expect(' ');

    let content = '';
    while (!lexer.isAtEnd() && lexer.peek() !== '(') {
        content += lexer.advance();
    }

    lexer.expect('(');
    let source = '';
    while (!lexer.isAtEnd() && lexer.peek() !== ')') {
        source += lexer.advance();
    }
    lexer.expect(')');

    return lexer.createToken(TokenType.IMAGE, content.trim(), { 
        source: source.trim(), 
        column: startColumn 
    });
}