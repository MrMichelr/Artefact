import { Comment } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse a comment token and return a Comment AST node
 * @param parser - The parser instance
 * @returns The parsed Comment node
 * @throws {ParserError} If the token is not a comment token
 */
export function parseComment(parser: Parser): Comment {
    const token = parser.advance();
    // Check if the current token is a comment token
    if (token.type !== TokenType.COMMENT) {
        throw new ParserError('Expected comment token', token.line, token.column);
    }

    // Create and return a new Comment node
    return new Comment(
        token.content, 
        token.line, 
        token.column
    );
}