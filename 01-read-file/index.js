const path = require('path');
const fs = require('fs');
let stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
stream.on('data', chunk => console.log(chunk));