import { Meta } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parses a meta token from the given tokens array
 * @param parser - The parser instance
 * @returns The parsed Meta node
 * @throws {ParserError} - If the token at the current index is not a META token
 */
export function parseMeta(parser: Parser): Meta {
    const token = parser.advance();
    // Check if the current token is a META token
    if (token.type !== TokenType.META) {
        throw new ParserError('Expected meta token', token.line, token.column);
    }

    // Create a new Meta node and return it
    return new Meta(
        token.name, 
        token.content, 
        token.line, 
        token.column
    );
}
