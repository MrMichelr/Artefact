# Artefact Templating Language Interpreter

## Requirements and Needs

1. Flexible node handling: Treat all nodes, including nested inline elements, consistently.
2. Extensibility: Support for custom output formats and node types.
3. Variable management: Global scope with the ability to redefine variables.
4. Anchor handling: Single-node anchors with unique IDs.
5. Output format flexibility: Currently HTML and Markdown, with potential for expansion.
6. Error handling: Continue processing even when encountering errors, similar to Markdown.
7. Debugging capabilities: Provide mechanisms for tracing the evaluation process.
8. Validation: Implement built-in validation for document structure and content.
9. Performance: Efficient rendering without lazy evaluation or partial rendering.
10. Newline handling: 1 newline for a new node, 2 newlines for a new section (div).

## Future Considerations

1. Multi-file handling
2. Inter-file variables
3. Links and styles (CSS)
4. Conditional rendering and control structures (in separate packages)
5. Template inheritance and partial templates (in separate packages)
6. Additional inline elements: `<code>`, `<b>`, `<i>`, `<u>`, `<sup>`
7. Plugin system for custom node types and output formats
8. Packages for specific functions and output (e.g., Reliquary, Sanctuary)

## Conclusions

1. The interpreter should use a flexible and extensible architecture to accommodate current and future needs.
2. A visitor pattern with a plugin system seems to be the most suitable approach.
3. The system should be designed to easily add new node types and output formats.
4. Debugging and validation mechanisms should be built into the core interpreter.
5. The interpreter should maintain consistency in handling all node types, including nested structures.

## Proposed Solution

1. Implement an Enhanced Visitor Pattern with Plugin System:

   ```typescript
   abstract class NodeVisitor {
   abstract visitHeading(node: Heading): string;
   abstract visitLink(node: Link): string;
   abstract visitImage(node: Image): string;
   // ... other visit methods for each node type
   }
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
2. Modify the Interpreter class to use visitors:

   ```typescript
   export class Interpreter {
   private visitor: NodeVisitor;
   public variables: Map<string, string> = new Map();
   public meta: Map<string, string> = new Map();
   private anchors: Map<string, string> = new Map();
   constructor(public outputFormat: 'html' | 'markdown') {
   this.visitor = outputFormat === 'html' ? new HTMLVisitor() : new MarkdownVisitor();
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
3. Implement a plugin system for adding new node types and output formats:

   ```typescript
   interface Plugin {
   nodeTypes?: Record<string, typeof ASTNode>;
   visitors?: Record<string, typeof NodeVisitor>;
   }
   export function registerPlugin(plugin: Plugin) {
   // Add new node types and visitors to the system
   }
   ```
4. Implement a debugging mechanism:

   ```Typescript
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
5. Implement a validation system:

   ```typescript
   Interface ValidationRule {
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

This solution provides a flexible and extensible framework for the Artefact Templating Language interpreter, addressing the main goals and challenges identified earlier.
