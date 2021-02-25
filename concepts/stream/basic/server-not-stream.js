const http = require('http')
const fs = require('fs')
const path = require('path');

const server = http.createServer(function(req, res) {
  fs.readFile(path.join(__dirname, '...' ,'/assets/big-file.txt'), (err, data) => {
    res.end(data);
  });
});
server.listen(3000, () => {
    console.log('Sever online.');
});