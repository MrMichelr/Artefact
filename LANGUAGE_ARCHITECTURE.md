# Artefact Templating Language Architecture

## Overview

Artefact is a custom templating language designed for creating structured documents with support for various elements, variables, and special features.

## Language Elements

### Basic Artefacts

1. **Headings**:
   * Syntax: `* Heading 1` to `****** Heading 6`
   * The number of asterisks determines the heading level (1-6)
   * Example: `** This is a level 2 heading`
2. **Links**:
   * Block syntax: `@ Link text (https://example.com)`
   * Inline syntax: `... @/Link text (https://example.com) ...`
   * The `@` symbol denotes a link, `/` for inline links
   * Example: `Check out this @/cool website (https://cool.com)!`
3. **Paragraph**: Default text without any special symbols.

### Composite Artefacts

Composite artefacts are elements that consist of multiple parts or can have additional associated information. In Artefact, the following are composite artifacts:

1. **Images**:
   * Syntax: `& -- Alt text (image_url)`
   * The `&` symbol denotes an image, `--` separates the alt text
   * Optional caption: `& -> Caption text`
   * Example:

     ```
     & -- A beautiful sunset (sunset.jpg)
     & -> Sunset over the ocean
     ```
2. **Citation Block**:
   * Syntax: `" -- Citation text`
   * Optional author: `" -> Author Name`
   * The `"` symbol denotes a citation, `--` for the quote, `->` for the author
   * Example:

     ```
     " -- To be or not to be, 
     " -- that is the question.
     " -> William Shakespeare
     ```
3. **Meta Tags**:
   * Syntax: `/ -(name) content`
   * Used for document metadata
   * Example: `/ -(author) John Doe`

Composites allow for more complex structures within a single element, providing additional context or information. They are parsed as a single unit but can contain multiple pieces of related data.

### Special Artefacts

1. **Comments**:

   * Syntax: `// This is a comment`
   * Comments are not rendered in the output
2. **Anchors**:

   * Syntax: `± -(anchor_name)`
   * Creates a named anchor point in the document
   * Example: `± -(section1)`
3. **Variables**:

   * Declaration: `$ variable_name = content`
   * Usage: `... $/variable_name ...`
   * Example:
     ```
     $ author = Jane Doe
     This document was written by $/author.
     ```

## Composition Rules

1. Block artefacts (headings, block links, images, citations) start at the beginning of a line.
2. Inline artefacts (inline links, variable usage) can be used within text content.
3. One newline creates a new node within the same section.
4. Two newlines create a new section (rendered as a new `<div>` in HTML output).

## Extensibility

The language is designed to be extensible, allowing for:

- Addition of new node types
- Custom output formats
- Plugins for specific functionality

For implementation details of the interpreter, refer to the `INTERPRETER_GUIDE.md` file.
