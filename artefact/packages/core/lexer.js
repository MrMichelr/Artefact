exports.lexer = lexer;

function lexer(str) {
    let lines = str.split(`\n`);
    let result = []

    for (let i = 0; i <= lines.length; i++) {

        let line = lines[i]


        result.push(require('./tokenizer').tokenizer(line, i))
    }

    return result;
}

//console.log(lexer(input))