const fs = require('fs');

exports.testCmd = test;

function test(str) {
    fs.readFile(`${process.cwd()}/${str}`, 'utf8', function(err, data) {

        var result = require("../interpreter/lexer").lexer(data)
        console.log(result);
    })

}