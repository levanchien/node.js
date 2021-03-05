const net = require('net');

const server = net.createServer({
    allowHalfOpen: true
}, (socket) => {
    console.log('Client connect' + socket.localAddress);
    socket.write('Hello From Server');
    socket.end('\nEnding');
    socket.on('error', (error) => console.log(error));
    socket.on('data', (data) => console.log('Data From Client: \n', data.toString()));
    socket.on('end', () => console.log('Client disconnected'));
})
.listen(80, () => {
    console.log("Server listening on port: " + server.address().toString());
});
