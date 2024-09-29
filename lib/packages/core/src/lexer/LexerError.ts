export class LexerError extends Error {
    line: number;
    column: number;

    constructor(message: string, line: number, column: number) {
        super(message);
        this.name = 'LexerError';
        this.line = line;
        this.column = column;
    }
}