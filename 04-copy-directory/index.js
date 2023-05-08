const path = require('path');
const fs = require('fs');

function copyDir(dir, dirCopy) {

  fs.promises.rm(path.join(__dirname, dirCopy), { force: true, recursive: true })
    .then(() => {

      fs.promises.mkdir(path.join(__dirname, dirCopy), { recursive: true })
        .then(() =>
          fs.promises.readdir(path.join(__dirname, dir), { withFileTypes: true })
            .then(filenames => {
              filenames.forEach(fname => {
                if (fname.isFile())
                  fs.promises.copyFile(path.join(__dirname, dir, fname.name), path.join(__dirname, dirCopy, fname.name))
              });
            })
        )

    })

}

copyDir('files', 'files-copy');
