import Parser from '../../src/parser/Parser';
import { Anchor, Citation, Document, Heading, Link, Meta, Text, VariableDeclaration, Image, Comment, VariableUse } from '../../src/parser/ASTNode';

describe('Parser', () => {
  test('parses a simple heading', () => {
    const input = '* Simple Heading';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Heading);
    expect((ast.children[0] as Heading).level).toBe(1);
    expect((ast.children[0] as Heading).content).toBe('Simple Heading');
  });

  test('parses multiple headings', () => {
    const input = '* Heading 1\n** Heading 2\n*** Heading 3';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(3);
    expect(ast.children[0]).toBeInstanceOf(Heading);
    expect((ast.children[0] as Heading).level).toBe(1);
    expect(ast.children[1]).toBeInstanceOf(Heading);
    expect((ast.children[1] as Heading).level).toBe(2);
    expect(ast.children[2]).toBeInstanceOf(Heading);
    expect((ast.children[2] as Heading).level).toBe(3);
  });

  test('parses a link', () => {
    const input = '@ Link text (https://example.com)';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Link);
    expect((ast.children[0] as Link).content).toBe('Link text');
    expect((ast.children[0] as Link).url).toBe('https://example.com');
  });

  test('parses inline link', () => {
    const input = 'This is an @/inline link(https://example.com)';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0]).toBeInstanceOf(Text);
    expect(ast.children[1]).toBeInstanceOf(Link);
    expect((ast.children[1] as Link).content).toBe('inline link');
    expect((ast.children[1] as Link).url).toBe('https://example.com');
    expect((ast.children[1] as Link).isInline).toBe(true);
  });

  test('parses image', () => {
    const input = '& -- Image Alt text (https://example.com/image.jpg)';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Image);
    expect((ast.children[0] as Image).source).toBe('https://example.com/image.jpg');
    expect((ast.children[0] as Image).content).toBe('Image Alt text');
  });

  test('parses citation block', () => {
    const input = '" -- This is a citation\n" -> Author Name';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Citation);
    expect((ast.children[0] as Citation).content).toBe('This is a citation');
    expect((ast.children[0] as Citation).author).toBe('Author Name');
  });

  test('parses comment', () => {
    const input = '// This is a comment';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Comment);
    expect((ast.children[0] as Comment).content).toBe('This is a comment');
  });

  test('parses meta tag', () => {
    const input = '/ -(author) John Doe';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Meta);
    expect((ast.children[0] as Meta).name).toBe('author');
    expect((ast.children[0] as Meta).content).toBe('John Doe');
  });

  test('parses anchor', () => {
    const input = '± -(section1)';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(Anchor);
    expect((ast.children[0] as Anchor).content).toBe('section1');
  });

  test('parses variable declaration', () => {
    const input = '$ myVar = Some content';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0]).toBeInstanceOf(VariableDeclaration);
    expect((ast.children[0] as VariableDeclaration).name).toBe('myVar');
    expect((ast.children[0] as VariableDeclaration).content).toBe('Some content');
  });

  // Should throw an error because the variable is not declared
  test('parses variable usage', () => {
    const input = 'Text with a $/myVar variable';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(3);
    expect(ast.children[0]).toBeInstanceOf(Text);
    expect(ast.children[1]).toBeInstanceOf(VariableUse);
    expect(ast.children[2]).toBeInstanceOf(Text);
    expect((ast.children[0] as Text).content).toBe('Text with a ');
    expect((ast.children[1] as VariableUse).content).toBe('myVar');
    expect((ast.children[2] as Text).content).toBe(' variable');
  });

  test('parses mixed content', () => {
    const input = '* Heading\nSome text with an @/inline link(https://example.com) and more text.\n** Subheading';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(5);
    expect(ast.children[0]).toBeInstanceOf(Heading);
    expect(ast.children[1]).toBeInstanceOf(Text);
    expect(ast.children[2]).toBeInstanceOf(Link);
    expect(ast.children[3]).toBeInstanceOf(Text);
    expect(ast.children[4]).toBeInstanceOf(Heading);
    expect((ast.children[0] as Heading).content).toBe('Heading');
    expect((ast.children[1] as Text).content).toBe('Some text with an ');
    expect((ast.children[2] as Link).content).toBe('inline link');
    expect((ast.children[3] as Text).content).toBe(' and more text.');
    expect((ast.children[4] as Heading).content).toBe('Subheading');
  });

  test('handles empty input', () => {
    const input = '';
    const parser = new Parser(input);
    const ast = parser.parse();

    expect(ast).toBeInstanceOf(Document);
    expect(ast.children).toHaveLength(0);
  });
});