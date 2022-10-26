const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if (err) throw new Error(err);
    files.forEach(file => {
        if (file.isFile()) {
        let extensionFiles = path.extname(file.name).slice(1);
        let nameFile = (path.parse(path.resolve(__dirname, file.name))).name;
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, item) => {
            if (error) console.log(error);
            console.log(`${nameFile} - ${extensionFiles} - ${item.size}b`);
        })
        }
    })
})