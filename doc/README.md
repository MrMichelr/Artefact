
# Artefact Templating Language Documentation

Welcome to the documentation for the **Artefact Templating Language**. This document provides an overview of the language, its syntax, and examples to help you get started.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Syntax](#syntax)
  - [Basic Artefacts](#basic-artefacts)
  - [Composite Artefacts](#composite-artefacts)
  - [Special Artefacts](#special-artefacts)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Tutorials](#tutorials)

## Overview

Artefact is a custom templating language designed for creating structured documents with support for various elements, variables, and special features.

## Getting Started

To get started with Artefact, you need to install it from the source. Follow these steps:

```shell
git clone https://github.com/MrMichelr/Artefact
cd artefact
npm install
```


## Syntax

### Basic Artefacts

1. **Headings**:

   - Syntax: `* Heading 1` to `****** Heading 6`
   - Example: `** This is a level 2 heading`
2. **Links**:

   - Block syntax: `@ Link text (https://example.com)`
   - Inline syntax: `... @/Link text (https://example.com) ...`
   - Example: `Check out this @/cool website (https://cool.com)!`
3. **Paragraph**: Default text without any special symbols.

### Composite Artefacts

1. **Images**:

   - Syntax: `& -- Alt text (image_url)`
   - Example:
     ```
     & -- A beautiful sunset (sunset.jpg)
     & -> Sunset over the ocean
     ```
2. **Citation Block**:

   - Syntax: `" -- Citation text`
   - Example:
     ```
     " -- To be or not to be, 
     " -- that is the question.
     " -> William Shakespeare
     ```
3. **Meta Tags**:

   - Syntax: `/ -(name) content`
   - Example: `/ -(author) John Doe`

### Special Artefacts

1. **Comments**:

   - Syntax: `// This is a comment`
2. **Anchors**:

   - Syntax: `± -(anchor_name)`
   - Example: `± -(section1)`
3. **Variables**:

   - Declaration: `$ variable_name = content`
   - Usage: `... $/variable_name ...`
   - Example:
     ```
     $ author = Jane Doe
     This document was written by $/author.
     ```

## Examples

Here are some examples of Artefact syntax in action:

```
* My Document Title
$ author = Michel Rodriguez
** Introduction
This document is written by $/author.
@ Visit my website (https://mr-michel.com)
```


## Best Practices

- Use clear and descriptive headings.
- Keep your documents organized with appropriate sections.
- Enjoy!

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for more information.

## Changelog

See the [Changelog](CHANGELOG.md) for updates and changes to the Artefact Templating Language.

## Tutorials

For step-by-step guides, check out the [Tutorials](TUTORIALS.md).
