import { TokenType } from "./TokenType";

export interface Token {
    type: TokenType;
    line: number;
    column: number;
    [key: string]: any;
}