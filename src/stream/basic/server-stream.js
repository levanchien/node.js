const http = require('http')
const fs = require('fs')

const server = http.createServer(function (req, res) {
  const stream = fs.createReadStream(__dirname + '/assets/aaa.txt');
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