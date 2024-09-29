# Tutorials for Artefact

This section provides tutorials to help you get started with the Artefact Templating Language.

## Tutorial 1: Creating Your First Document

1. **Create a New File**: Start by creating a new file with a `.artf` extension.
2. **Add a Title**: Use a heading to define the title of your document.
   ```markdown
   * My First Artefact Document
   ```
3. **Add Content**: Write your content using paragraphs and artefacts.
   ```markdown
   ** Introduction
   This is my first document using Artefact.
   ```
4. **Save and Render**: Save your file and use the Artefact interpreter to render it.

## Tutorial 2: Using Variables

1. **Declare a Variable**: Use the variable declaration syntax.
   ```markdown
   $ author = John Doe
   ```
2. **Use the Variable**: Reference the variable in your text.
   ```markdown
   This document was written by $/author.
   ```

## Tutorial 3: Adding Links and Images

1. **Add a Link**:
   ```markdown
   @ Visit my website (https://example.com)
   ```
2. **Add an Image**:
   ```markdown
   & -- An example image (image.jpg)
   & -> This is an example image.
   ```

For more tutorials, check back regularly as we expand our documentation!
