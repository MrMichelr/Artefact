# Artefact Templating Language Interpreter Guide

## Overview

The Artefact Templating Language is a flexible and extensible markup language designed for creating structured documents. This interpreter converts the language into HTML or Markdown output.

## Key Components

1.**Parser**: Converts input text into an Abstract Syntax Tree (AST).

2.**Interpreter**: Traverses the AST and generates output in the desired format.

3.**ASTNodes**: Represent different elements in the language.

## Current Implementation

### Parser

```
typescript:lib/packages/core/src/parser/Parser.ts
startLine: 27
endLine: 171
```

The Parser class is responsible for converting input text or tokens into an AST. It uses individual parsing functions for each node type.

### Interpreter

```
typescript:lib/packages/core/src/interpreter/Interpreter.ts
startLine: 20
endLine: 118
```

### ASTNodes

```
typescript:lib/packages/core/src/parser/ASTNode.ts
startLine: 1
endLine: 189
```

These classes represent different elements in the language, such as headings, links, images, etc.

## Current Limitations

1. Limited extensibility for new node types and output formats.
2. Lack of built-in debugging and validation mechanisms.
3. No support for nested inline elements.
4. Limited error handling and recovery.

## Goals for Improvement

1. Implement a more flexible and extensible architecture.
2. Add support for nested inline elements.
3. Improve error handling and recovery.
4. Implement debugging and validation mechanisms.
5. Prepare for future extensions (multi-file handling, conditional rendering, etc.).

## Proposed Solution: Enhanced Visitor Pattern with Plugin System

1. Implement abstract NodeVisitor class:
   ```typescript
   abstract class NodeVisitor {
     abstract visitHeading(node: Heading): string;
     abstract visitLink(node: Link): string;
     // ... other visit methods for each node type
   }
   ```
2. Create concrete visitors for HTML and Markdown:
   ```typescript
   class HTMLVisitor extends NodeVisitor {
       visitHeading(node: Heading): string {
       return <h${node.level}>${this.visitChildren(node)}</h${node.level}>;
   }
   // ... other visit methods
   }
   class MarkdownVisitor extends NodeVisitor {
   visitHeading(node: Heading): string {
   return '#'.repeat(node.level) + ' ' + this.visitChildren(node);
   }
   // ... other visit methods
   }
   ```
3. Modify the Interpreter class to use visitors:
   ```typescript
   export class Interpreter {
     private visitor: NodeVisitor;
     // ... other properties
     constructor(public outputFormat: "html" | "markdown") {
       this.visitor =
         outputFormat === "html" ? new HTMLVisitor() : new MarkdownVisitor();
     }
     interpret(ast: Document): string {
       return this.visitNode(ast);
     }
     private visitNode(node: ASTNode): string {
       // Implement debugging/tracing here
       const result = (this.visitor as any)`visit${node.type}`;
       // Implement validation here
       return result;
     }
     // ... other methods
   }
   ```
4. Implement a plugin system for adding new node types and output formats:
   ```typescript
   interface Plugin {
     nodeTypes?: Record<string, typeof ASTNode>;
     visitors?: Record<string, typeof NodeVisitor>;
   }
   export function registerPlugin(plugin: Plugin) {
     // Add new node types and visitors to the system
   }
   ```
5. Add debugging mechanism:
   ```typescript
    export class Interpreter {
        // ... other properties
        private debugMode: boolean = false;
        enableDebug() {
            this.debugMode = true;
        }
        private visitNode(node: ASTNode): string {
            if (this.debugMode) {
                console.log(Visiting node: ${node.type});
            }
        // ... rest of the method
        }
    }
   ```
6. Implement validation system:
    ```typescript
    interface ValidationRule {
        validate(node: ASTNode): boolean;
        errorMessage: string;
    }
    export class Interpreter {
        // ... other properties
        private validationRules: ValidationRule[] = [];
        addValidationRule(rule: ValidationRule) {
            this.validationRules.push(rule);
        }
        private validateNode(node: ASTNode) {
            for (const rule of this.validationRules) {
                if (!rule.validate(node)) {
                    console.warn(Validation error: ${rule.errorMessage});
                }
            }
        }
    }
    ```

## Next Steps

1. Refactor the existing Interpreter class to use the new visitor pattern.
2. Implement HTML and Markdown visitors.
3. Create a plugin system for registering new node types and visitors.
4. Add debugging and validation mechanisms to the Interpreter.
5. Update existing node evaluators to work with the new system.
6. Create comprehensive tests for the new implementation.
7. Document the new architecture and provide examples for extending the system.

## Future Considerations

1. Multi-file handling
2. Inter-file variables
3. Links and styles (CSS)
4. Conditional rendering and control structures (in separate packages)
5. Template inheritance and partial templates (in separate packages)
6. Additional inline elements: `<code>`, `<b>`, `<i>`, `<u>`, `<sup>`
7. Packages for specific functions and output (e.g., Reliquary, Sanctuary)

By following this guide and implementing the proposed solution, you'll create a more flexible and extensible Artefact Templating Language interpreter that can easily accommodate future requirements and extensions.
