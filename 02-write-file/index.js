const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin, stdout } = process;

stdout.write('Введите текст. Для завершения работы введите exit или нажмите ctr+c \n');

stdin.on('data', data =>{
  if(data.toString().trim() === 'exit') process.emit('SIGINT');
  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('До встречи!\n');
  process.exit();
});
