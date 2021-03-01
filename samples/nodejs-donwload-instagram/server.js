const fs = require('fs');
const request = require('./request');

function convertToRightUrl(url) {
  return url
    .match(/"https:(.*?)"/g)[0]
    .replace(/\\/g, '')
    .replace(/"/g, '')
    .replace(/u0026/g, '&');
}

function extractDisplayUrlFromHtml(html) {
  const re = /"display_url":"(.*?)"/g;
  const result = html.match(re);
  return result.map(convertToRightUrl);
}

async function download(url) {
  console.log(`Downloading: ${url} !`);
  const res = await request(url);
  return new Promise(resolve => {
    const output = fs.createWriteStream(`images/${res.originFileName}`);
    res.data.pipe(output);
      output.on('finish', () => {
        output.close();
        resolve();
    });
  });
}

async function getInstagramImgs(link) {
  try {
    const html = await request(link);
    const displayUrls = extractDisplayUrlFromHtml(html);
    const downloadProcess = displayUrls.map(url => download(url));
    await Promise.all(downloadProcess);
    console.log('Finish all download !');
  } catch (e) {
    console.log(e);
  }
}

const link = 'https://www.instagram.com/zaheun_/?hl=vi';

getInstagramImgs(link);
