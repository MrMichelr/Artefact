/**
 * Custom error class for interpreter-related errors.
 * Extends the built-in Error class.
 */
export class InterpreterError extends Error {
    /**
     * Creates a new InterpreterError instance.
     * @param message - The error message.
     */
    constructor(message: string, public nodeLine?: number, public nodeColumn?: number) {
        super(message);
        this.name = 'InterpreterError';
    }

    toString(): string {
        return `${this.name}: ${this.message}${this.nodeLine ? ` at line ${this.nodeLine}` : ''}${this.nodeColumn ? `, column ${this.nodeColumn}` : ''}`;
    }
}