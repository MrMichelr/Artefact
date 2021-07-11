const fs = require('fs');

exports.clearCmd = clear;

function clear(filename) {
    const buildFile = `${process.cwd()}/builds`

    if (filename === undefined) {
        // If no filename we delete everything

        if (fs.existsSync(buildFile)) {
            // Check if the file exist

            fs.rmdir(buildFile, { recursive: true }, (err) => {
                if (err) throw err;
            });

        }

    } else {
        //If we enter a name

        fs.unlinkSync(`${buildFile}/${filename}.html`, function(err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });

    }
}