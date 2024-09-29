import Lexer from '../../src/lexer/Lexer';
import chalk from 'chalk';
import { TokenType } from '../../src/lexer/TokenType';
import { Token } from '../../src/lexer/Token';

class TokenMismatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenMismatchError';
  }
}

function tokenizeAndExpect(input: string, expectedTokens: Partial<Token>[], message: string) {
  const lexer = new Lexer(input);
  const tokens = lexer.tokenize();

  expect(tokens.length).toEqual(expectedTokens.length + 1); // +1 for EOF token

  expectedTokens.forEach((expectedToken, index) => {
    try {
      expect(tokens[index]).toMatchObject(expectedToken);
    } catch (error) {
      const actualToken = tokens[index];
      const formattedError = formatTokenMismatch(expectedToken, actualToken, index);
      throw new TokenMismatchError(formattedError);
    }
  });

  expect(tokens[tokens.length - 1].type).toEqual(TokenType.EOF);
}

function formatTokenMismatch(expected: Partial<Token>, actual: Token, index: number): string {
  const maxKeyLength = Math.max(...Object.keys(expected).map(k => k.length));

  const lines = Object.keys(expected).map(key => {
    const expectedValue = JSON.stringify(expected[key]);
    const actualValue = JSON.stringify(actual[key]);
    const padding = ' '.repeat(maxKeyLength - key.length);

    return `${key}:${padding} ${chalk.green(expectedValue.padEnd(20))} ${chalk.red(actualValue)}`;
  });

  return [
    `Token mismatch at index ${index}:`,
    '',
    'Expected                      Actual',
    '--------                      ------',
    ...lines,
    `Line: ${actual.line}, Column: ${actual.column}`
  ].join('\n');
}

describe('Lexer', () => {
  test('tokenizes a simple heading', () => {
    tokenizeAndExpect('* Simple Heading', [
      {
        type: TokenType.HEADING,
        content: 'Simple Heading',
        level: 1,
        line: 1,
        column: 1
      }
    ], 'Simple heading tokenization failed');
  });

  test('tokenizes multiple headings', () => {
    const input = '* Heading 1\n** Heading 2\n*** Heading 3\n**** Heading 4\n***** Heading 5\n****** Heading 6';
    const expectedTokens = Array.from({ length: 6 }, (_, i) => ({
      type: TokenType.HEADING,
      content: `Heading ${i + 1}`,
      level: i + 1,
      line: i + 1,
      column: 1
    }));
    tokenizeAndExpect(input, expectedTokens, 'Multiple headings tokenization failed');
  });

  test('tokenizes a block link', () => {
    tokenizeAndExpect('@ Link text (https://example.com)', [
      {
        type: TokenType.LINK,
        content: 'Link text',
        url: 'https://example.com',
        isInline: false,
        line: 1,
        column: 1
      }
    ], 'Block link tokenization failed');
  });

  test('tokenizes inline link', () => {
    tokenizeAndExpect('This is an @/inline link(https://example.com) in text.', [
      { type: TokenType.TEXT, content: 'This is an ' },
      {
        type: TokenType.LINK,
        content: 'inline link',
        url: 'https://example.com',
        isInline: true,
        line: 1,
        column: 12
      },
      { type: TokenType.TEXT, content: ' in text.' }
    ], 'Inline link tokenization failed');
  });

  test('tokenizes basic image', () => {
    tokenizeAndExpect('& -- Image description (https://example.com/image.jpg)', [
      {
        type: TokenType.IMAGE,
        content: 'Image description',
        source: 'https://example.com/image.jpg',
        line: 1,
        column: 1
      }
    ], 'Basic image tokenization failed');
  });

  test('tokenizes citation', () => {
    tokenizeAndExpect('" -- This is a citation', [
      {
        type: TokenType.CITATION,
        content: 'This is a citation',
        line: 1,
        column: 1
      }
    ], 'Citation tokenization failed');
  });

  test('tokenizes author citation', () => {
    tokenizeAndExpect('" -> John Doe', [
      {
        type: TokenType.CITATION,
        content: 'John Doe',
        isAuthor: true,
        column: 1
      }
    ], 'Citation Author tokenization failed');
  });

  test('tokenizes comment', () => {
    tokenizeAndExpect('// This is a comment', [
      {
        type: TokenType.COMMENT,
        content: 'This is a comment',
        line: 1,
        column: 1
      }
    ], 'Comment tokenization failed');
  });

  test('tokenizes meta tag', () => {
    tokenizeAndExpect('/ -(author) John Doe', [
      {
        type: TokenType.META,
        name: 'author',
        content: 'John Doe',
        line: 1,
        column: 1
      }
    ], 'Meta tag tokenization failed');
  });

  test('tokenizes anchor', () => {
    tokenizeAndExpect('± -(section1)', [
      {
        type: TokenType.ANCHOR,
        content: 'section1',
        line: 1,
        column: 1
      }
    ], 'Anchor tokenization failed');
  });

  test('tokenizes variable declaration', () => {
    tokenizeAndExpect('$ myVar = Some content', [
      {
        type: TokenType.VARIABLE_DECLARATION,
        name: 'myVar',
        content: 'Some content',
        line: 1,
        column: 1
      }
    ], 'Variable declaration tokenization failed');
  });

  test('tokenizes variable usage', () => {
    tokenizeAndExpect('Text with a $/myVar variable', [
      { type: TokenType.TEXT, content: 'Text with a ' },
      {
        type: TokenType.VARIABLE_USE,
        content: 'myVar',
        isUsage: true,
        line: 1,
        column: 13
      },
      { type: TokenType.TEXT, content: ' variable' }
    ], 'Variable usage tokenization failed');
  });

  test('handles mixed content', () => {
    const input = '* Heading\nParagraph with @/link(https://example.com) and $/variable.\n// Comment\n& -- Image (image.jpg)';
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();

    const expectedTokens = [
      { type: TokenType.HEADING, content: 'Heading', level: 1 },
      { type: TokenType.TEXT, content: 'Paragraph with ' },
      { type: TokenType.LINK, content: 'link', url: 'https://example.com', isInline: true },
      { type: TokenType.TEXT, content: ' and ' },
      { type: TokenType.VARIABLE_USE, content: 'variable', isUsage: true },
      { type: TokenType.TEXT, content: '.' },
      { type: TokenType.COMMENT, content: 'Comment' },
      { type: TokenType.IMAGE, content: 'Image', source: 'image.jpg' }
    ];

    expect(tokens.length).toEqual(expectedTokens.length + 1);

    expectedTokens.forEach((expectedToken, index) => {
      expect(tokens[index]).toMatchObject(expectedToken);
    });

    expect(tokens[tokens.length - 1].type).toEqual(TokenType.EOF);
  });
});