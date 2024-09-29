import { ASTNode, Document, Anchor, Link, InlineNode, InsetNode, Text, VariableDeclaration, VariableUse } from '../parser/ASTNode';
import { InterpreterError } from './InterpreterError';
import { NodeVisitor } from './NodeVisitor';
import { HTMLVisitor } from './visitors/HTMLVisitor';
import { MarkdownVisitor } from './visitors/MarkdownVisitor';

export default class Interpreter {
    private visitor: NodeVisitor;
    public variables: Map<string, string> = new Map();
    public meta: Map<string, string> = new Map();
    private anchors: Map<string, string> = new Map();

    constructor(public outputFormat: 'html' | 'markdown') {
        this.visitor = outputFormat === 'html' ? new HTMLVisitor() : new MarkdownVisitor();
    }

    interpret(ast: Document): string {
        this.collectAnchors(ast);
        let content = this.visitNode(ast);
        content = this.resolveVariables(content);
        return this.resolveAnchors(content);
    }

    private collectAnchors(node: ASTNode): void {
        if (node instanceof Anchor) {
            this.anchors.set(this.slugify(node.content), node.content);
        } else if (node instanceof Document) {
            node.children.forEach(child => this.collectAnchors(child));
        }
    }

    private visitNode(node: ASTNode): string {
        try {
            if (node instanceof Document) {
                return this.visitDocument(node);
            } else if (node instanceof VariableDeclaration) {
                this.variables.set(node.name, node.content);
                return '';
            } else if (node instanceof VariableUse) {
                return this.variables.get(node.content) || `\${${node.content}}`;
            }
        } catch (error) {
            this.handleError(error, node);
        }
        return this.visitor.visit(node);
    }

    private visitDocument(node: Document): string {
        const results: string[] = [];
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            let result = '';
            if (child instanceof InlineNode || child instanceof VariableUse) {
                result = this.handleInlineNode(node.children, i);
                results.pop();
            } else if (child instanceof InsetNode) {
                result = this.handleInsetNode(node.children, i);
                results.pop();
            } else {
                result = this.visitNode(child);
            }
            results.push(result);
        }
        return results.join(this.outputFormat === 'html' ? '\n' : '\n\n').trim();
    }

    private handleInlineNode(children: ASTNode[], index: number): string {
        const previousChild = children[index - 1];
        const currentChild = children[index];
        const nextChild = children[index + 1];
        return this.combineNodes(previousChild, currentChild, nextChild);
    }

    private combineNodes(previousNode: ASTNode, currentNode: ASTNode, nextNode?: ASTNode): string {
        const previousContent = this.visitNode(previousNode);
        const currentContent = this.visitNode(currentNode);
        const nextContent = nextNode ? this.visitNode(nextNode) : '';

        if (currentNode instanceof InlineNode && !currentNode.isInline) {
            return previousContent + '\n' + currentContent + '\n' + nextContent;
        }
    
        const regex = /^<(\w+)([^>]*)>(.*?)<\/\1>$/;
        const match = previousContent.match(regex);
    
        if (match) {
            const [, tag, attributes, content] = match;
            const combinedContent = content + currentContent + nextContent;
            // Remove any nested paragraph tags
            const cleanedContent = combinedContent.replace(/<\/?p>/g, '');
            return `<${tag}${attributes}>${cleanedContent}</${tag}>`;
        }
    
        // If no matching tags found, simply concatenate the contents
        return previousContent + currentContent + nextContent;
    }

    private handleInsetNode(children: ASTNode[], index: number): string {
        const previousChild = children[index - 1];
        if (previousChild) {
            return this.addAnchorToElement(previousChild, children[index]);
        }
        return '';
    }

    private handleError(error: any, node: ASTNode): void {
        if (error instanceof InterpreterError) {
            throw error;
        }
        throw new InterpreterError(`Error processing node of type ${node.type}: ${error.message}`, node.line, node.column);
    }

    private addAnchorToElement(previousNode: ASTNode, node: ASTNode): string {
        const content = this.visitor.visit(previousNode);
        const anchorID = this.slugify(node.content || '');
        return this.outputFormat === 'html'
            ? content.replace(/^<(\w+)/, `<$1 id="${anchorID}"`)
            : `<a id="${anchorID}"></a>\n${content}`;
    }

    private addInNode(previousNode: ASTNode, node: ASTNode, nextNode?: ASTNode): string {
        const previousContent = this.visitor.visit(previousNode);
        const currentContent = this.visitor.visit(node);
        const nextContent = nextNode ? this.visitor.visit(nextNode) : '';
        const regex = /<(.*?)>(.*?)<\/(.*?)>/;
        const match = previousContent.match(regex);
        if (match) {
            return `<${match[1]}>${match[2]}${currentContent}${nextContent.replace(regex, '$2')}</${match[3]}>`;
        }
        throw new InterpreterError(`Error processing node of type ${node.type}: Regex Issue`, node.line, node.column);
    }

    private resolveAnchors(content: string): string {
        return content.replace(/<a href="([^"]+)">/g, (match, href) => {
            const anchorId = this.slugify(href);
            const anchorName = this.anchors.get(anchorId);
            return anchorName ? `<a href="#${anchorId}">` : match;
        });
    }

    private resolveVariables(content: string): string {
        return content.replace(/\$\{(\w+)\}/g, (match, variableName) => {
            const value = this.variables.get(variableName);
            return value !== undefined ? value : match;
        });
    }

    private slugify(str: string): string {
        return str.toLowerCase().replace(/ /g, '-');
    }
}