const path = require('path');
const fs = require('fs/promises');

function copyDir(dir, dirCopy) {

  fs.rm(path.join(__dirname, dirCopy), { force: true, recursive: true })
    .then(() => {

      fs.mkdir(path.join(__dirname, dirCopy), { recursive: true })
        .then(() =>
          fs.readdir(path.join(__dirname, dir), { withFileTypes: true })
            .then(filenames => {
              filenames.forEach(fname => {
                if (fname.isFile())
                  fs.copyFile(path.join(__dirname, dir, fname.name), path.join(__dirname, dirCopy, fname.name))
              });
            })
        )

    })

}

copyDir('files', 'files-copy');
