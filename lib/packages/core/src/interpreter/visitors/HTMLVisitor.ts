import { NodeVisitor } from '../NodeVisitor';
import { ASTNode, Document, Heading, Text, Link, Image, Citation, Comment, Meta, Anchor, VariableDeclaration, VariableUse, InlineNode, InsetNode } from '../../parser/ASTNode';

export class HTMLVisitor extends NodeVisitor {
    visitDocument(node: Document): string {
        return node.children.map(child => this.visit(child)).join('\n');
    }

    visitHeading(node: Heading): string {
        return `<h${node.level}>${node.content}</h${node.level}>`;
    }

    visitText(node: Text): string {
        return `<p>${node.content}</p>`;
    }

    visitLink(node: Link): string {
        return `<a href="${node.url}">${node.content}</a>`;
    }

    visitImage(node: Image): string {
        return `<img src="${node.source}" alt="${node.content}" />`;
    }

    visitCitation(node: Citation): string {
        return `<blockquote>${node.content}${node.author ? ` <cite>- ${node.author}</cite>` : ''}</blockquote>`;
    }

    visitComment(node: Comment): string {
        return `<!-- ${node.content} -->`;
    }

    visitMeta(node: Meta): string {
        return `<meta name="${node.name}" content="${node.content}" />`;
    }

    visitAnchor(node: Anchor): string {
        return `<a id="#${node.content}"></a>`;
    }

    visitVariableDeclaration(node: VariableDeclaration): string {
        return ''; // Variable declarations are not rendered in HTML
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