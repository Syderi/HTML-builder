
const fs = require('fs');
const path = require('path');

// fs.rm удаляет папку по названию.

// fs.mkdir Асинхронно создает каталог.

// fs.copyFile(src, dest[, mode], callback)
// Асинхронно копирует src к dest. По умолчанию, 
// dest перезаписывается, если он уже существует.
//  Функции обратного вызова не передаются никакие аргументы,
//   кроме возможного исключения. Node.js не дает никаких 
//   гарантий относительно атомарности операции копирования. 
//   Если ошибка возникает после того, как целевой 
//   файл был открыт для записи,
//  Node.js попытается удалить место назначения.

// fs.readdir Читает содержимое каталога.
// Обратный вызов получает два аргумента (err, files) куда files представляет собой массив
//  имен файлов в каталоге, исключая '.' а также '..'.

//  Если options.withFileTypes установлен на true,
// то files массив будет содержать объекты {fs.Dirent}.

// stats.isFile()
// Возвращает: {логическое}
// Возврат true если объект {fs.Stats} описывает обычный файл.

fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true, force: true }, (errorRm) => {
    if (errorRm) throw new Error(errorRm);

    fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, (errorMkdir) => {
        if (errorMkdir) throw new Error(errorMkdir);
    });

    fs.readdir(path.resolve(__dirname, 'files'), { withFileTypes: true }, (errorRaeddir, files) => {
        if (errorRaeddir) throw new Error(errorRaeddir);
        files.forEach(file => {
            if (file.isFile()) {
                let oldDirectory = path.resolve(__dirname, 'files', file.name);
                let copyDirectory = path.resolve(__dirname, 'files-copy', file.name);
                fs.copyFile(oldDirectory, copyDirectory, (errorCopyFile) => {
                    if (errorCopyFile) throw new Error(errorCopyFile);
                    console.log(`file ${file.name} is copy in directory "files-copy"`)
                });
            } else {
                console.log('comand "node 04-copy-directory" can copy only failes, not directory')
            }
        });
    });

});


