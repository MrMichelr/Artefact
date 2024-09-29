/**
 * Custom error class for optimizer-related errors.
 * Extends the built-in Error class.
 */
export class OptimizerError extends Error {
    /**
     * Creates a new OptimizerError instance.
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'OptimizerError';
    }
}