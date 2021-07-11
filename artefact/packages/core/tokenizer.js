exports.tokenizer = tokenizer;

function tokenizer(str, ln) {
    const t = require('./token.js')
    const line = ln + 1

    //console.log("input : " + str)

    if (str === undefined) {
        return t.token("EOF", str, line)
    }

    let word = str.split(" ");

    switch (word[0]) {
        // Basic Artifact
        case `*`:
            return t.token("Heading 1", str, line)
            break;

        case `**`:
            return t.token("Heading 2", str, line)
            break;

        case `***`:
            return t.token("Heading 3", str, line)
            break;

        case `****`:
            return t.token("Heading 4", str, line)
            break;

        case `*****`:
            return t.token("Heading 5", str, line)
            break;

        case `*****`:
            return t.token("Heading 6", str, line)
            break;

        case `@`:
            return t.token("Link", str, line)
            break;

        case `&`:
            return t.token("Image", str, line)
            break;

        case `"`:
            return t.token("Citation", str, line)
            break;

        case `>`:
            return t.token("Code Block", str, line)
            break;


            // Special Block
        case `//`:
            return t.token("Comments", str, line)
            break;

        case `/`:
            return t.token("Meta", str, line)
            break;

        case `±`:
            return t.token("Anchor", str, line)
            break;

        case `$`:
            return t.token("Variable", str, line)
            break;


            // Default
        case ``:
            return t.token("Line Break", str, line)
            break;

        default:
            return t.token("Paragraph", str, line)
            break;

    }
}