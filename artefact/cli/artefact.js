#!/usr/bin/env node

// npm link the first time to create the command

const fs = require('fs');
const command = process.argv[2]

switch (command) {
    case "build":
        require("./build").buildCmd(process.argv[3]);
        break;

    case "clear":
        require("./clear").clearCmd(process.argv[3]);
        break;

    case "help":
        require("./help").helpCmd(process.argv[3]);
        break;

    case "test":
        require("./test").testCmd(process.argv[3]);
        break;

    default:
        fs.readFile(`${__dirname}/text/commands.txt`, "utf8", function(err, data) {
            console.log(data)
        })
        break;
}