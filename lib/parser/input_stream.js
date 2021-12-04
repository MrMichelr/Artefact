/*
 * Input Stream
 * Read all the character of the source code
 *  
 */

'use strict';

function InputStream(input) {
    var position = 0
    var line = 1
    var column = 0

    return {
        next    : next,
        peek    : peek,
        eof     : eof,
        error   : error
    }

    /**
     * return the next value
     */
    function next() {
        var character = input.charAt(position ++)

        // If the end of the line
        if (character == '\n') {
            line ++
            column = 0
        }
        else {
            column ++
        }

        return character
    }

    /**
     * return a character at a certain position
     */
    function peek() {
        return input.charAt(position)
    }

    /**
     * return if the end of the file/ stream is reached
     */
    function eof() {
        return peek() == ""
    }

    /**
     * Handle Errors
     * @param {String} message 
     */
    function error(message) {
        throw new Error(message + ' (' + line + ':' + column + ')')
    }
}

module.exports = InputStream