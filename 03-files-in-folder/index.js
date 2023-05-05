const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, 'secret-folder');

fs.promises.readdir(dir, { withFileTypes: true })
  .then(filenames => {
    filenames.forEach(fname => {
      if (fname.isFile())
        fs.stat(path.join(dir, fname.name), (err, stats) => {
          console.log(`${path.parse(fname.name).name} - ${path.parse(fname.name).ext.substring(1)} - ${stats.size / 1000}kb`);
        });
    });
  })

  .catch(err => {
    console.log(err)
  })