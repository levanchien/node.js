const net = require('net');

const client = net.createConnection(80, "localhost", () => {
    console.log('Connect success !');
    client.write('Hello From Client');
});

client.on('data', (data) => {
    console.log('Data From Server:\n', data.toString());
    client.destroy();
});
