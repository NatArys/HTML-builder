const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const dirStyles = path.join(__dirname, 'styles');

fs.promises.readdir(dirStyles, { withFileTypes: true })
  .then(filenames => {
    filenames.forEach(fname => {
      if (fname.isFile() && path.parse(fname.name).ext === '.css') {

        let input = fs.createReadStream(path.join(dirStyles, fname.name), 'utf8');

        input.on('data', function (chunk) {
          output.write(chunk);
        });

      }
    })
  });
