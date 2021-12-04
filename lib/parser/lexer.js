/*
 * Lexer 
 * Analyse the code source and return an array
 * of token
 */

'use strict';

/**
 * Transform the source code in an array of tokens
 * @param {*} input Input Stream
 */
function Lexer (input) {
    var current = null
    /// - current.      The position of the cursor

    const artfifacts = ["//", "*", "**", "***", "/ -"]
    /// - artifacts.    A list of artifacts to identify
    ///                 (e.g. `*`, `@`, `&`)

    var input = input
    /// - inputs.       The Input Stream we want to analyse

    return {
        next    : next,
        peek    : peek,
        eof     : eof,
        error   : input.error
    }

    /**
     * Continue to forward until we reach a character 
     * or the end of the File/Stream.
     * return a string
     */
    function readWhile(predicate) {
        var str = ""
        while (!input.eof() && predicate(input.peek())) {
            str += input.next()
        }
        return str;
    }

    /**
     * Take care of the differents kind of tokens 
     * (e.g. Whitespace, comments, quote, etc.)
     */
    function readNext() {
        readWhile(isWhitespace);

        // If the program is at the end of the input
        if (input.eof()) { return null }

        var character = input.peek();

        //Conditions
        if (isArtifactStart(character)) return readIdent();

        if (isText(character)) return readString();

        
        //input.error("Can't handle character: " + character)    
    }

    function isWhitespace (character) {
        return " \t\n".indexOf(character) >= 0
    }

    function isArtifactStart (character) {
        return "/*#&\">@$±".indexOf(character) >= 0;
    }

    function isText (character) {
        return /[a-z]/i.test(character)
    }

    function readIdent () {
        var id = readWhile(isId);
        return {
            type  : isArtifact(id) ? "art" : "var",
            value : id
        }
    }
    function readString () {
        return { type: "str", value: readEscaped('\n') };
    }

    function readEscaped(end) {
        var escaped = false
        var str = ""
        while (!input.eof()) {
            var character = input.next()

            if (escaped) { str += character; escaped = false}
            else if (character == "\\") { escaped = true }
            else if (character == end ) { break }
            else { str += character }
        }
        return str
    }

    function isArtifact (x) {
        return artfifacts.indexOf(x) >= 0
    }
    function isId(character) {
        return isArtifactStart(character) || "?!-<>=0123456789".indexOf(character) >= 0;
    }

    /**
     * return the current token
     */
    function peek () {
        return current || (current = readNext())
    }

    /**
     * Take the next token & delete the current one
     */
     function next () {
        var token = current
        current = null
        return token || readNext()
    }

    /**
     * Boolean to know if the end of the file/ stream is reached
     */
    function eof () {
        return peek() == null
    }

    
}

module.exports = Lexer