import { VariableUse } from '../ASTNode';
import { TokenType } from '../../lexer/TokenType';
import { ParserError } from '../ParserError';
import Parser from '../Parser';

export function parseVariableUse(parser: Parser): VariableUse {
  const token = parser.advance();
  if (token.type !== TokenType.VARIABLE_USE) {
    throw new ParserError('Expected variable use token', token.line, token.column);
  }
  if (!parser.isInSymbolTable(token.content)) {
    throw new ParserError(`Undeclared variable: ${token.content}`, token.line, token.column);
    //return new VariableUse('undefined', token.line, token.column);
  }
  return new VariableUse(
    token.content,
    token.line,
    token.column
  );
}