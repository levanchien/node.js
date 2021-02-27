const http = require('http');

const PORT = 3001;

http.createServer((req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        console.log(data);
    })
}).listen(PORT, () => {
    console.log('Log Server start on port: ' + PORT);
});