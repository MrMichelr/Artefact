import { TokenType } from '../TokenType';
import { Token } from '../Token';
import Lexer from '../Lexer';

/**
 * Tokenizes a variable in the lexer stream.
 * 
 * Variable Declaration: Starts with $ followed by a space, then name, =, and content
 * Variable Use: Starts with $/ followed by the variable name
 * 
 * @param lexer The lexer instance to tokenize from
 * @param startColumn The starting column of the token
 * @returns A Token object representing the variable (either declaration or use)
 */
export function tokenizeVariable(lexer: Lexer, startColumn: number): Token {
    lexer.advance(); // Skip the $
    
    if (lexer.peek() === ' ') {
        // Variable Declaration

        lexer.advance(); // Consume the space
        let name = '';
        while (!lexer.isAtEnd() && lexer.peek() !== '=') {
            name += lexer.advance();
        }
        lexer.expect('=');
        lexer.advance(); // Consume the space after =

        let content = '';
        while (!lexer.isAtEnd() && lexer.peek() !== '\n') {
            content += lexer.advance();
        }

        return lexer.createToken(TokenType.VARIABLE_DECLARATION, content.trim(), { 
            name: name.trim(), 
            column: startColumn 
        });
    } else if (lexer.peek() === '/') {
        // Variable Use
        const isUsage = true

        lexer.advance(); // Consume the /
        let name = '';
        while (!lexer.isAtEnd() && /[a-zA-Z0-9_]/.test(lexer.peek())) {
            name += lexer.advance();
        }

        return lexer.createToken(TokenType.VARIABLE_USE, name.trim(), { 
            isUsage,
            column: startColumn 
        });
    } else {
        lexer.throwError('Invalid variable syntax');
    }
}