const fs = require('fs');
const path = require('path');

// Метод fs.stat() используется для возврата информации
//  о данном файле или каталоге. Он возвращает
//   объект fs.Stat , который имеет несколько
//    свойств и методов для получения сведений 
//    о файле или каталоге.

// fs.appendFile(path, data[, options], callback)
// Асинхронно добавлять данные в файл, создавая файл, если он еще не существует. 

// fs.unlink(path.resolve(__dirname, 'project-dist', 'bundle.css'), (err) => {
//   })

// nodeFS.createWriteStream(destStylesFile, { flags: 'w' }); w - обнуляет файл

fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw new Error(err);
});

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (errorReaddir, styles) => {
    if (errorReaddir) throw new Error(errorReaddir);
    styles.forEach(style => {
        if (style.isFile()) {
            let extensionFiles = path.extname(style.name).slice(1);
            if (extensionFiles === 'css') {
                const stream = fs.ReadStream(path.resolve(__dirname, "styles", style.name));
                stream.on('readable', () => {
                    let text = stream.read()
                    if (text) {
                        fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), text.toString('utf8'), (err) => {
                            if (err) throw err;
                        });
                    }
                })
            }
        }
    });
});



