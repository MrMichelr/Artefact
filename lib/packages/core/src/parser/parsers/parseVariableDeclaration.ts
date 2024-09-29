import { VariableDeclaration } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

export function parseVariableDeclaration(parser: Parser): VariableDeclaration {
  const token = parser.advance();
  if (token.type !== TokenType.VARIABLE_DECLARATION) {
    throw new ParserError('Expected variable declaration token', token.line, token.column);
  }
  parser.addToSymbolTable(token.name, token.content);
  return new VariableDeclaration(
    token.name,
    token.content,
    token.line,
    token.column
  );
}