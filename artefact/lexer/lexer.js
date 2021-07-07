'use strict'

var t = require("./tokenizer")

var input = `
// This document is a Manifest for the V1.0
// of the Artefact Templating Language
// This file will be compile in HTML so,
// you can add meta tags:

/ -(name) content


* Heading 1
** Heading 2
*** Heading 3

Paragraph more or less longer but you can add *emphazis* and /italic/ text inside.
But if you have added a variable you can use it: 
Hello $/name
You can also use an inline @/link (https://)

" -- Citation Block
" -> Author

> -- Code Block

@ Link Text (https://)

$ variable = content

& -- Image (source)
& -> caption
± -(name of the anchor)

// The anchor is a good way to add a custom link
// to your own file anytime you want
// You can go to your anchor with :
// @/Go to my anchor (name of the anchor)
`

function lexer(str) {
    let lines = str.split(`\n`);
    let result = []

    for (let i = 0; i <= lines.length; i++) {

        let line = lines[i]


        result.push(t.tokenizer(line))
    }

    return result;
}

console.log(lexer(input))


// To move in another file