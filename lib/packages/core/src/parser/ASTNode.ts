export abstract class ASTNode {
    constructor(
        public readonly type: string,
        public readonly line: number,
        public readonly column: number,
        public readonly content?: string,
    ) {}

    abstract toJSON(): Record<string, unknown>;
}

export abstract class InlineNode extends ASTNode {
    constructor(
        type: string,
        line: number,
        column: number,
        public readonly isInline?: boolean
    ) {
        super(type, line, column);
    }
}

export abstract class InsetNode extends ASTNode {
    constructor(
        type: string,
        line: number,
        column: number,
        public readonly isInset?: boolean
    ) {
        super(type, line, column);
    }
}

export class Document extends ASTNode {
    constructor(public readonly children: ASTNode[]) {
        super('Document', 1, 1);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            children: this.children.map(child => child.toJSON()),
        };
    }
}

export class Heading extends ASTNode {
    constructor(
        public readonly level: number,
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('Heading', line, column, content);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            level: this.level,
            content: this.content,
        };
    }
}

export class Link extends InlineNode {
    constructor(
        public readonly content: string,
        public readonly url: string,
        isInline: boolean,
        line: number,
        column: number
    ) {
        super('Link', line, column, isInline);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
            url: this.url,
            isInline: this.isInline,
        };
    }
}

export class Image extends ASTNode {
    constructor(
        public readonly content: string,
        public readonly source: string,
        line: number,
        column: number
    ) {
        super('Image', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
            source: this.source,
        };
    }
}

export class Citation extends ASTNode {
    constructor(
        public readonly content: string,
        line: number,
        column: number,
        public readonly author?: string
    ) {
        super('Citation', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
            author: this.author,
        };
    }
}

export class Comment extends ASTNode {
    constructor(
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('Comment', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
        };
    }
}

export class Meta extends ASTNode {
    constructor(
        public readonly name: string,
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('Meta', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            name: this.name,
            content: this.content,
        };
    }
}

export class Text extends ASTNode {
    constructor(
        public readonly content: string,
        line: number,
        column: number,
    ) {
        super('Text', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
        };
    }
}

export class Anchor extends InsetNode {
    constructor(
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('Anchor', line, column, true);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
            isInset: true
        };
    }
}

export class VariableDeclaration extends ASTNode {
    constructor(
        public readonly name: string,
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('VariableDeclaration', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            name: this.name,
            content: this.content,
        };
    }
}

export class VariableUse extends ASTNode {
    constructor(
        public readonly content: string,
        line: number,
        column: number
    ) {
        super('VariableUse', line, column);
    }

    toJSON(): Record<string, unknown> {
        return {
            type: this.type,
            line: this.line,
            column: this.column,
            content: this.content,
        };
    }
}
