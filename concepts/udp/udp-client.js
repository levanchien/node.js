const dgram = require('dgram');

const client = dgram.createSocket("udp4");
/*
    Gui du lieu ma khong can thiet lap ket noi,
    Cung khong quan tam thang kia co Online ko
*/
client.send('Hello !', 80, '127.0.0.1', (error, bytes) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('bytes sent: ' + bytes);
    client.close();
});