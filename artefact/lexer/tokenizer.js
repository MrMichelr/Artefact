exports.tokenizer = function(str) {

    console.log("input : " + str)

    if (str === undefined) {
        return {
            type: "EOF"
        }
    }

    let word = str.split(" ");

    // if (word === undefined) { return { type: "Line-break" } }

    switch (word[0]) {
        // Basic Artifact
        case `*`:
            return {
                type: "Heading 1"
            }
            break;
        case `**`:
            return {
                type: "Heading 2"
            }
            break;
        case `***`:
            return {
                type: "Heading 3"
            }
            break;
        case `*`:
            return {
                type: "Heading 4"
            }
            break;
        case `**`:
            return {
                type: "Heading 5"
            }
            break;
        case `***`:
            return {
                type: "Heading 6"
            }
            break;
        case `@`:
            return {
                type: "Link"
            }
            break;
        case `&`:
            return {
                type: "Image"
            }
            break;
        case `"`:
            return {
                type: "Citation"
            }
            break;
        case `>`:
            return {
                type: "Code Block"
            }
            break;

            // Special Block
        case `//`:
            return {
                type: "Comments"
            }
            break;
        case `/`:
            return {
                type: "Meta"
            }
            break;
        case `±`:
            return {
                type: "Anchor"
            }
            break;
        case `$`:
            return {
                type: "Variable"
            }
            break;

            // Default
        case ``:
            return {
                type: "Line Break"
            }
            break;
        default:
            return {
                type: "Paragraph"
            }
            break;
    }
}