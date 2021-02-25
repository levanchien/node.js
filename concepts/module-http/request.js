const https = require('https');

module.exports.get = function(url) {
    return new Promise((resolve, reject) => {
        https.get(url , resp => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        })
        .on('error', error => {
            console.log("Error: " + error.message);
            reject(error);
        });
    })
}
