import { Image } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse an image token and return an Image AST node
 * @param parser - The parser instance
 * @returns The parsed Image node
 * @throws {ParserError} If the token is not an image token
 */
export function parseImage(parser: Parser): Image {
    const token = parser.advance();
    if (token.type !== TokenType.IMAGE) {
        throw new ParserError('Expected image token', token.line, token.column);
    }
    return new Image(
        token.content, 
        token.source, 
        token.line, 
        token.column
    );
}
