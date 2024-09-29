import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

export function tokenizeAnchor(lexer: Lexer, startColumn: number): Token {
    lexer.advance(); // Skip the ±
    lexer.expect(' ');
    lexer.expect('-');
    lexer.expect('(');

    let name = '';
    while (!lexer.isAtEnd() && lexer.peek() !== ')') {
        name += lexer.advance();
    }

    lexer.expect(')');
    console.log(`Anchor name: ${name}`)
    console.log(`Anchor name trimmed: ${name.trim()}`)

    return lexer.createToken(TokenType.ANCHOR, name.trim(), { 
        column: startColumn 
    });
}