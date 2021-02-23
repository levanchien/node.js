const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/assets/aaa.txt', (err, data) => {
    res.end(data);
  });
});
server.listen(3000, () => {
    console.log('Sever online.');
});