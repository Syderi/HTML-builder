const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Please typing text: ')

r1.on('line', (input) => {

    if (input !== 'exit') {
        fs.appendFile(path.join(__dirname, 'text.txt'), `${input} `, () => {
        })
        console.log('...');
    }
    else {
        r1.close();
        console.log('File "text.txt" is created/changed.');
    }
});

r1.on('SIGINT', () => {
    r1.close();
    console.log('File "text.txt" is created/changed.');
});
