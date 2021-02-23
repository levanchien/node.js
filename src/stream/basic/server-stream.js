const http = require('http')
const fs = require('fs')
const path = require('path');

const server = http.createServer(function (req, res) {
  const stream = fs.createReadStream(path.join(__dirname, '...' ,'/assets/big-file.txt'));
  stream.on('data', (chunk) => {
    res.write(chunk);
  });
  stream.on('end', () => {
    res.end();
  })
  // stream.pipe(res);
});
server.listen(3000, () => {
  console.log('Sever online.');
});