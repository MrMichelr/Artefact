'use strict';

// Token class

function Token(type, tag, nesting) {

    // type -> String
    // Type of the token (string, title, etc.)
    this.type = type;

    // tag -> String
    // html tag name
    this.tag = tag;

    // attrs -> Array
    // html attributes. Format: '[[name1, value1], [name2, value2]]'
    this.attrs = null;

    // map -> Array
    // Source map infos. Format: '[line_beign, line_end]'
    this.map = null;

    // nesting -> Int
    /**
     * - '1'  = tag is opening
     * - '0'  = tag is self closing
     * - '-1' = tag is closing
     **/
    this.nesting = nesting;

    // level -> Int
    // nesting level
    this.level = 0;

    // children -> Array
    // An array of child nodes (inline & img tokens)
    this.children = null;

    // content -> String
    // If Self-closing tag (html, code, etc.) -> it's the content
    this.content = '';

    // artifact -> String
    // the character of the artifact
    this.artifact = ''



}