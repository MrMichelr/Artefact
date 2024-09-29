import { Link } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { Token } from '../../lexer/Token';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse a link token and return a Link AST node
 * @param parser - The parser instance
 * @returns The parsed Link node
 * @throws {ParserError} If the token is not a link token
 */
export function parseLink(parser: Parser): Link {
    const token = parser.advance();
    
    // Check if the current token is a link token
    if (token.type !== TokenType.LINK) {
        throw new ParserError('Expected link token', token.line, token.column);
    }
    // Create and return a new Link node
    return new Link(
        token.content, 
        token.url, 
        token.isInline, 
        token.line, 
        token.column
    );
}
