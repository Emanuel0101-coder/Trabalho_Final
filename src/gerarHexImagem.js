const fs = require('fs');

const imagemPath = 'path/to/your/image.jpg'; // Caminho para a imagem
fs.readFile(imagemPath, (err, data) => {
  if (err) {
    console.error('Erro ao ler a imagem:', err);
    return;
  }
  const hexData = data.toString('hex');
  console.log(hexData);  // Imprime a imagem em hexadecimal
});
