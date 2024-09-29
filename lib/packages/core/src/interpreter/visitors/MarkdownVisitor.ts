import { NodeVisitor } from '../NodeVisitor';
import { ASTNode, Document, Heading, Text, Link, Image, Citation, Comment, Meta, Anchor, VariableDeclaration, VariableUse, InlineNode, InsetNode } from '../../parser/ASTNode';

export class MarkdownVisitor extends NodeVisitor {
    visitDocument(node: Document): string {
        return node.children.map(child => this.visit(child)).join('\n\n');
    }

    visitHeading(node: Heading): string {
        return `${'#'.repeat(node.level)} ${node.content}`;
    }

    visitText(node: Text): string {
        return node.content;
    }

    visitLink(node: Link): string {
        return `[${node.content}](${node.url})`;
    }

    visitImage(node: Image): string {
        return `![${node.content}](${node.source})`;
    }

    visitCitation(node: Citation): string {
        return `> ${node.content}${node.author ? `\n> — ${node.author}` : ''}`;
    }

    visitComment(node: Comment): string {
        return `<!-- ${node.content} -->`;
    }

    visitMeta(node: Meta): string {
        return ''; // Meta information is not rendered in Markdown
    }

    visitAnchor(node: Anchor): string {
        return `<a id="${node.content}"></a>`; // HTML anchor for compatibility
    }

    visitVariableDeclaration(node: VariableDeclaration): string {
        return ''; // Variable declarations are not rendered in Markdown
    }

    visitVariableUse(node: VariableUse): string {
        // This should be replaced with the actual variable value during interpretation
        return node.content;
    }

    visitInlineNode(node: InlineNode): string {
        // Handle inline nodes generically
        return this.visit(node);
    }

    visitInsetNode(node: InsetNode): string {
        // Handle inset nodes generically
        return this.visit(node);
    }
}