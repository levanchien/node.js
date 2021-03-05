const dgram = require('dgram');

const server = dgram.createSocket('udp4', (msg, rinfo) => {
    console.log('received ' + rinfo.size);
    console.log('from ' + rinfo.address + ":" + rinfo.port);
    console.log('message is: ' + msg.toString());
});

server.bind(80, () => {
    console.log('Bound to: ' + JSON.stringify(server.address()));
});
