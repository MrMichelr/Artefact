exports.token = token;

function token(type, content, line) {

    if (type != 'EOF' && type != 'Line Break') {

        if (content != undefined) {

            // We analyse only what can be analyse

            var words = content.split(" ")
            var subTokens = []

            if (type != "Paragraph") {
                subTokens.push({ artefact: words[0], col: [1, words[0].length] })
            }
            console.log(subTokens)


        }

    } else { return { type: type, line: line } }


    return {
        type: type,
        content: content,
        line: line,
        subTokens: subTokens

    }

}