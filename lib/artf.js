
const fs = require('fs')
const command = process.argv[2]

switch (command){
    case "build" :
        build(process.argv[3])
        break
    case "test" :
        test(process.argv[3])
        break
    default: console.log("ok c'est cool")
}


function build (str) {
    const file = str.split('/')
    const lastArg = file.length
    const name = file[lastArg - 1]. split('.')
    const filename = name[0]
    const extension = "html"
    const buildFile = `${process.cwd()}/builds`

    if (str === undefined) {
        var e = new Error("You need to enter a file to build")
        throw e;
    }

    if (!fs.existsSync(buildFile)) {
        // If ./Builds doesn't exist
        fs.mkdirSync(buildFile)
    }

    if (file[0] === "/") {
        // If typed arg begin with '/'

        if (fs.existsSync(`${process.cwd()}${str}`)) {
            fs.writeFileSync(`${buildFile}/${filename}.${extension}`, "<html><body>Hello world</body></html>")
        }
    } else {

        if (fs.existsSync(`${process.cwd()}/${str}`)) {
            fs.writeFileSync(`${buildFile}/${filename}.${extension}`, "<html><body>Hello world</body></html>")
        }
    }

}

function test (str) {
    fs.readFile(`${process.cwd()}/${str}`, 'utf8', function(err, data) {

        var result = require("./artefact").artefact(data)
        console.log(result);
    })
}