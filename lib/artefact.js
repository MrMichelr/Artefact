
'use strict';

// Require
var is = require ('./parser/input_stream')
var lex = require ('./parser/lexer')

var config = {}

function main (input) {
    var stream = is(input)
    var lexer = lex(stream);
    
    var txt = ""
    while (lexer.eof){
        lexer.next()

        console.log(lexer.peek())
        if (lexer.peek() == undefined) break;
    }
    
    
}

exports.artefact = main