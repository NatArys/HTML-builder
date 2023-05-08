const path = require('path');
const fs = require('fs');

const sborkaDir = path.join(__dirname, 'project-dist');

fs.promises.rm(sborkaDir, { force: true, recursive: true })
  .then(() => {
    fs.promises.mkdir(sborkaDir, { recursive: true })
      .then(() => {
        copyDir('assets', 'project-dist');
        mergeStyles();
        createHtml();
      })
  })

async function copyDir(dir, dirCopy) {
  const newDir = `${dirCopy}/${dir}`;

  fs.promises.mkdir(path.join(__dirname, newDir), { recursive: true })
    .then(() => {
      fs.promises.readdir(path.join(__dirname, dir), { withFileTypes: true })
        .then(filenames => {
          for (let fname of filenames) {
            if (fname.isDirectory()) {
              copyDir(`${dir}/${fname.name}`, dirCopy);
            } else if (fname.isFile()) {
              fs.promises.copyFile(path.join(__dirname, dir, fname.name), path.join(__dirname, newDir, fname.name))
            }
          }
        })
    })
}

async function createHtml() {
  let dataTemplate = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const htmlComponents = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });

  for (let component of htmlComponents) {
    if (path.parse(component.name).ext === '.html') {
      let dataHtml = await fs.promises.readFile(path.join(__dirname, 'components', component.name), 'utf-8');
      dataTemplate = dataTemplate.replace(`{{${path.parse(component.name).name}}}`, dataHtml);
    }
  };

  const output = fs.createWriteStream(path.join(sborkaDir, 'index.html'));
  output.write(dataTemplate);
}

async function mergeStyles() {
  const output = fs.createWriteStream(path.join(sborkaDir, 'style.css'));
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
}
