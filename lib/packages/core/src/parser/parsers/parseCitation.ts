import { Citation } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse a citation token and return a Citation AST node
 * @param parser - The parser instance
 * @returns The parsed Citation node
 * @throws {ParserError} If the token is not a citation token
 */
export function parseCitation(parser: Parser): Citation {
    const contentToken = parser.advance();
    
    // Check if the current token is a citation token
    if (contentToken.type !== TokenType.CITATION) {
        throw new ParserError('Expected citation token', contentToken.line, contentToken.column);
    }

    let authorToken = null;
    if (parser.peek().type === TokenType.CITATION && parser.peek().isAuthor) {
        authorToken = parser.advance();
    }

    // Create and return a new Citation node
    return new Citation(
        contentToken.content, 
        contentToken.line, 
        contentToken.column,
        authorToken ? authorToken.content : undefined);
}