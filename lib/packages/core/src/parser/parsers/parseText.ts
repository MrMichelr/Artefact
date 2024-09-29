import { Text } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse a text token and return a Text AST node
 * @param parser - The parser instance
 * @returns The parsed Text node
 * @throws {ParserError} If the token is not a text token
 */
export function parseText(parser: Parser): Text {
    const token = parser.advance();
    // Check if the current token is a text token
    if (token.type !== TokenType.TEXT) {
        throw new ParserError('Expected text token', token.line, token.column);
    }

    return new Text(
        token.content, 
        token.line, 
        token.column
    );
}