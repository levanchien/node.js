const https = require('https');
const path = require('path');

function extractBody(res) {
  return new Promise((resolve, reject) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      resolve(data);
    });
  })
}

module.exports = (url) => {
  return new Promise(resolve => {
    return https.get(url, async (res) => {
      const type = res.headers['content-type'].split('/')[0];
      const ext = res.headers['content-type'].split('/')[1];

      switch (type) {
        case 'text':
          return resolve(await extractBody(res));
        case 'application':
          return resolve(JSON.parse(await extractBody(res)));
        case 'image':
          const urlObj = new URL(url);
          const originFileName = urlObj.pathname.split('/').reverse()[0];
          return resolve({
            data: res,
            ext: ext,
            media: true,
            originFileName
          });
        default:
          throw new Error(`${res.headers['content-type']} is not supported for now !`);
      }
    });
  });
}
