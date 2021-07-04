function* Lexer(str) {
    let lines = str.split("\n")

    for (let line = 0; line < lines.length; line++) {
        let char = lines[line][0]

        switch (char) {
            case "*":
                yield Heading(lines[line]);
                break;

            case ">":
                yield {
                    type: "Link",
                    value: lines[line],
                    line: line + 1
                }
                break;

            case "/":
                yield {
                    type: "Block code",
                    value: lines[line],
                    line: line + 1
                }
                break;

            case "|":
                yield {
                    type: "Citation",
                    value: lines[line],
                    line: line + 1
                }
                break;

            case undefined:
                break;

            default:
                yield {
                    type: "Paragraph",
                    value: lines[line],
                    line: line + 1
                }
                break;

        }


        function Heading(value) {
            let artefact = 0

            for (let cursor = 0; cursor <= 4; cursor++) {

                if (value[cursor] === "*") { artefact++ }
            }

            switch (artefact) {
                case 1:
                    return {
                        type: "Title",
                        value: lines[line],
                        line: line + 1
                    }
                    break;

                case 2:
                    return {
                        type: "Heading 1",
                        value: lines[line],
                        line: line + 1
                    }
                    break;

                case 3:
                    return {
                        type: "Heading 2",
                        value: lines[line],
                        line: line + 1
                    }

                    break;

                default:
                    break;
            }
        }

    }

}

console.log('Start')
for (const line of Lexer(input)) {
    console.log(line);
}
console.log('Finish')