const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Начало тут я удалю директорию
const clearDirectory = async () => {
    await fsPromises.rm(path.resolve(__dirname, "project-dist"), { recursive: true, force: true });
}
// Конец  тут я удалю директорию

// Начало тут я создаю директорию
const createDirectory = async () => {
    await fsPromises.mkdir(path.resolve(__dirname, "project-dist"), { recursive: true }, (err) => {
        if (err) throw new Error(err);
        // console.log('Create project-dist');
    });
}
// Конец  тут я создаю директорию

// Начало функция копирования файлов assets
const copyAssetsDirectory = async (oldDirectory = path.resolve(__dirname, 'assets'),
    copyDirectory = path.resolve(__dirname, "project-dist", 'assets')) => {

    let elemetns = await fsPromises.readdir(oldDirectory, { withFileTypes: true }, (errorReaddir, elments) => {
        if (errorReaddir) throw new Error(errorReaddir);
    });
    await fsPromises.mkdir(copyDirectory, { recursive: true }, (errorMkdir) => {
        if (errorMkdir) throw new Error(errorMkdir);
    });
    for (let index = 0; index < elemetns.length; index++) {
        const element = elemetns[index];
        let oldDirectoryNextStep = path.resolve(oldDirectory, element.name)
        let copyDirectoryNextStep = path.resolve(copyDirectory, element.name)
        if (element.isDirectory()) {
            await copyAssetsDirectory(oldDirectoryNextStep, copyDirectoryNextStep);
        } else {
            await fsPromises.copyFile(oldDirectoryNextStep, copyDirectoryNextStep)
        }
    }
}
// Конец функция копирования файлов assets

// Начало создания файла бандл
const createStyle = async () => {
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
                            fs.appendFile(path.resolve(__dirname, 'project-dist', 'style.css'), text.toString('utf8'), (err) => {
                                if (err) throw err;
                            });
                        }
                    })
                }
            }
        });
    });
}
// Конец  создания файла бандл

// Начало создания файла HTML
const createHtml = async () => {

    let templateStart = await fsPromises.readFile(path.resolve(__dirname, 'template.html'), 'utf8', (err, data) => {
        if (err) throw new Error(err)
    });

    let htmls = await fsPromises.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (errorReaddir, htmls) => {
        if (errorReaddir) throw new Error(errorReaddir);
    });

    for (let index = 0; index < htmls.length; index++) {
        let html = htmls[index]
        // htmls.forEach(html => {
        if (html.isFile()) {
            let extensionFiles = path.extname(html.name).slice(1);
            if (extensionFiles === 'html') {
                let htmlText = await fsPromises.readFile(path.resolve(__dirname, 'components', html.name), 'utf8', (err, data) => {
                    if (err) throw new Error(err)
                });
                templateStart = templateStart.replace(`{{${html.name.replace('.html','')}}}`, htmlText);
            }
        }
    };

    fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), templateStart, 'utf8', (err) => {
        if (err) throw new Error(err);
    });
}
// Конец  создания файла HTML

// Начало главный раздел

const mainFunction = async () => {

    await clearDirectory();
    await createDirectory();
    await copyAssetsDirectory();
    await createStyle();
    await createHtml();

    return true;
};

// Start job
mainFunction().then(res => {
    console.log('Success');
});
// Конец главный раздел
