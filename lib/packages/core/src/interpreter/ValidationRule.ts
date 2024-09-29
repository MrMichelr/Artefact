// Import the ASTNode type from the ASTNode file
import { ASTNode } from '../parser/ASTNode';

// Define the ValidationRule interface
export interface ValidationRule {
    // Method to validate an ASTNode
    validate(node: ASTNode): boolean;
    // Error message to display if validation fails
    errorMessage: string;
}

// Rule to ensure a node of a specific type has non-empty content
export class RequiredContentRule implements ValidationRule {
    constructor(private nodeType: string) {}

    validate(node: ASTNode): boolean {
        // Check if the node is of the specified type and has non-empty content
        return node.type === this.nodeType && node.content !== undefined && node.content.trim() !== '';
    }

    errorMessage = `${this.nodeType} must have non-empty content`;
}

// Rule to limit the maximum length of a node's content
export class MaxLengthRule implements ValidationRule {
    constructor(private nodeType: string, private maxLength: number) {}

    validate(node: ASTNode): boolean {
        // If the node is not of the specified type, it passes
        // Otherwise, check if the content length is within the limit
        return node.type !== this.nodeType || (node.content !== undefined && node.content.length <= this.maxLength);
    }

    errorMessage = `${this.nodeType} content must not exceed ${this.maxLength} characters`;
}

// Rule to validate URLs in Link and Image nodes
export class ValidUrlRule implements ValidationRule {
    validate(node: ASTNode): boolean {
        // Only apply this rule to Link and Image nodes
        if (node.type !== 'Link' && node.type !== 'Image') return true;
        // Regular expression to validate URL format
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        // Test the url or source property against the pattern
        return urlPattern.test((node as any).url || (node as any).source);
    }

    errorMessage = 'URL must be valid';
}