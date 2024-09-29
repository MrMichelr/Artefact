import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a link in the lexer stream.
 * 
 * Links start with @ followed by optional text and a URL in parentheses.
 * The format is: @[text](url)
 * If no text is provided, the URL is used as the text.
 * 
 * @param lexer The lexer instance to tokenize from
 * @returns A Token object representing the link
 */
export function tokenizeLink(lexer: Lexer, startColumn: number): Token {
    let isInline = false;
    lexer.advance(); // Consume the '@' character
    
    if (lexer.peek() === '/') {
        isInline = true;
        lexer.advance();
    }

    let text = '';
    while (!lexer.isAtEnd() && lexer.peek() !== '(') {
        text += lexer.advance();
    }

    lexer.expect('(');

    let url = '';
    while (!lexer.isAtEnd() && lexer.peek() !== ')') {
        url += lexer.advance();
    }

    lexer.expect(')');


    return lexer.createToken(TokenType.LINK, text.trim(), { 
        url: url.trim(), 
        isInline, 
        column: startColumn
    });
}