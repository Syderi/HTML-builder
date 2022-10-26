// console.log('0000 = Hello. World')

const fs = require('fs');
// console.log(fs)
const path = require('path');
// console.log('10 =',path.join(__dirname, 'text.txt'))
const stream = fs.ReadStream(path.resolve(__dirname, 'text.txt'));

// console.log('20 =',stream)
stream.on('readable', () => {
    let text = stream.read()
    if (text) {
        console.log(text.toString('utf8'))
    }
})