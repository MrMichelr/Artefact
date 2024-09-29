import { Heading, Text } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { Token } from '../../lexer/Token';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse a heading token and return a Heading AST node
 * @param parser - The parser instance
 * @returns The parsed Heading node
 * @throws {ParserError} If the token is not a heading token
 */
export function parseHeading(parser: Parser): Heading {
    const token = parser.advance();

    if (token.type !== TokenType.HEADING) {
        throw new ParserError('Expected heading token', token.line, token.column);
    }

    if (token.level < 1 || token.level > 5) {
        throw new ParserError(`Invalid heading level: ${token.level}`, token.line, token.column);
    }

    // Create and return a new Heading node
    return new Heading(
        token.level, 
        token.content, 
        token.line, 
        token.column
    );
}
