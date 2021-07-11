const fs = require('fs');

exports.helpCmd = help;

function help(str) {
    var command = ""

    switch (str) {
        case "build":
            command = "build"
            break;

        case "clear":
            command = "clear"
            break;

        default:
            command = "commands"
            break;
    }

    fs.readFile(`${__dirname}/text/${command}.txt`, "utf8", function(err, data) {
        console.log(data)
    })

}