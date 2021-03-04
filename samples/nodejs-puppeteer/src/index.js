const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');

const url = 'https://www.instagram.com/lilybabeart/';

async function scrollToBottom(page, scrollTime = 0) {
  const promise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        resolve();
      }, 1500);
    })
  };
  for (let i = 0; i < scrollTime; i += 1) {
    await promise();
  }
}

function downloadImage (url, dir = '') {
  const urlObj = new URL(url);
  const fileOriginName = urlObj.pathname.split('/').reverse()[0];
  return new Promise(resolve => {
    https.get(url, res => {
      const output = fs.createWriteStream(`${dir}/${fileOriginName}`);
      res.pipe(output);
      output.on('finish', () => {
        output.close();
        resolve();
      })
    })
  });
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir: 'C:/Users/Admin/AppData/Local/Google/Chrome/User Data'
  });
  const page = await browser.newPage();
  await page.goto(url);

  await scrollToBottom(page, 1);
  
  const imagesUrlSet = await page.$$eval('img[srcset]', els => els.map(el => el.getAttribute('srcset')));

  const imagesUrl = imagesUrlSet
    .map(item => item.split(/ [0-9]{3}w[,]{0,1}/))
    .filter(item => item.length > 1)
    .map(item => item[item.length - 2])

  const processDownload = imagesUrl.map(url => downloadImage(url, 'images'));
  await Promise.all(processDownload);
}

main();
