import { Anchor } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

/**
 * Parse an anchor token and return an Anchor AST node
 * @param parser - The parser instance
 * @returns The parsed Anchor node
 * @throws {ParserError} If the token is not an anchor token
 */
export function parseAnchor(parser: Parser): Anchor {
  const token = parser.advance();
  // Check if the current token is an anchor token
  if (token.type !== TokenType.ANCHOR) {
    throw new ParserError('Expected anchor token', token.line, token.column);
  }
  // Create and return a new Anchor node
  return new Anchor(
    token.content, 
    token.line, 
    token.column
  );
}