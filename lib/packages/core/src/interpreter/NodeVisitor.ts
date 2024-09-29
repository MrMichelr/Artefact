import { ASTNode, Document, Heading, Text, Link, Image, Citation, Comment, Meta, Anchor, VariableDeclaration, VariableUse, InlineNode, InsetNode } from '../parser/ASTNode';

export abstract class NodeVisitor {
    abstract visitDocument(node: Document): string;
    abstract visitHeading(node: Heading): string;
    abstract visitText(node: Text): string;
    abstract visitLink(node: Link): string;
    abstract visitImage(node: Image): string;
    abstract visitCitation(node: Citation): string;
    abstract visitComment(node: Comment): string;
    abstract visitMeta(node: Meta): string;
    abstract visitAnchor(node: Anchor): string;
    abstract visitVariableDeclaration(node: VariableDeclaration): string;
    abstract visitVariableUse(node: VariableUse): string;
    abstract visitInlineNode(node: InlineNode): string;
    abstract visitInsetNode(node: InsetNode): string;

    visit(node: ASTNode): string {
        switch (node.type) {
            case 'Document': return this.visitDocument(node as Document);
            case 'Heading': return this.visitHeading(node as Heading);
            case 'Text': return this.visitText(node as Text);
            case 'Link': return this.visitLink(node as Link);
            case 'Image': return this.visitImage(node as Image);
            case 'Citation': return this.visitCitation(node as Citation);
            case 'Comment': return this.visitComment(node as Comment);
            case 'Meta': return this.visitMeta(node as Meta);
            case 'Anchor': return this.visitAnchor(node as Anchor);
            case 'VariableDeclaration': return this.visitVariableDeclaration(node as VariableDeclaration);
            case 'VariableUse': return this.visitVariableUse(node as VariableUse);
            default:
                if (node instanceof InlineNode) return this.visitInlineNode(node);
                if (node instanceof InsetNode) return this.visitInsetNode(node);
                throw new Error(`Unexpected node type: ${node.type}`);
        }
    }
}