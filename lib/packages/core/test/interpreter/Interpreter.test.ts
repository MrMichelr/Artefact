import { Interpreter } from '../../src/interpreter/Interpreter';
import { Document, Heading, Text, Link, Image, Citation, Anchor, Meta, Comment, VariableUse, VariableDeclaration } from '../../src/parser/ASTNode';

describe('Interpreter', () => {
  let interpreter: Interpreter;

  beforeEach(() => {
    interpreter = new Interpreter('html');
  });

  test('interprets a simple document with HTML output', () => {
    const ast = new Document([
      new Heading(1, 'Test Heading', 1, 1),
      new Text('This is a test paragraph.', 2, 1),
      new Link('Test Link', 'https://example.com', false, 3, 1),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('<h1>Test Heading</h1>\n<p>This is a test paragraph.</p>\n<a href="https://example.com">Test Link</a>');
  });

  test('interprets a simple document with Markdown output', () => {
    interpreter = new Interpreter('markdown');
    const ast = new Document([
      new Heading(2, 'Test Heading', 1, 1),
      new Text('This is a test paragraph.', 2, 1),
      new Image('Test Image', 'image.jpg', 3, 1),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('## Test Heading\n\nThis is a test paragraph.\n\n![Test Image](image.jpg)');
  });

  test('interprets an image correctly', () => {
    const ast = new Document([
      new Image('Test Image', 'image.jpg', 1, 1),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('<img src="image.jpg" alt="Test Image" />');
  });

  test('interprets a citation correctly', () => {
    const ast = new Document([
      new Citation('To be or not to be', 1, 1, 'Shakespeare'),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('<blockquote>To be or not to be <cite>- Shakespeare</cite></blockquote>');
  });

  test('interprets meta tags correctly', () => {
    const ast = new Document([
      new Meta('title', 'Document Title', 1, 1),
      new Meta('author', 'Document Author', 2, 1),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toContain('<meta name="title" content="Document Title" />');
    expect(result).toContain('<meta name="author" content="Document Author" />');
  });

  test('ignores comments in output', () => {
    const ast = new Document([
      new Text('Visible text', 1, 1),
      new Comment('// This is a comment', 2, 1),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('<p>Visible text</p>\n<!-- // This is a comment -->');
  });

  test('resolves anchors correctly', () => {
    const ast = new Document([
      new Heading(2, 'Test Heading', 1, 1),
      new Anchor('section 1', 2, 1),
      new Text('Go to ', 3, 1),
      new Link('Section 1', 'section 1', true, 3, 7),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toBe('<h2 id="section-1">Test Heading</h2>\n<p>Go to <a href="#section-1">Section 1</a></p>');
  });

  test('interprets variables correctly', () => {
    const ast = new Document([
      new VariableDeclaration('author', 'Jane Doe', 1, 1),
      new Text('This document was written by ', 2, 1),
      new VariableUse('author', 2, 29),
      new Text('.', 2, 36),
    ]);

    const result = interpreter.interpret(ast);
    expect(result).toContain('<p>This document was written by Jane Doe.</p>');
  });

});