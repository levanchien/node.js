const https = require('https');

const MAX_TASK = 10;
const context = [];

const queue = require('fastq').promise(context, task, MAX_TASK);
const queue2 = require('fastq').promise(context, task, MAX_TASK);

// console.log(queue === queue2); // false

function call(url) {
    return new Promise(resolve => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
    })
}

async function task(arg) {
    const result = await call('https://jsonplaceholder.typicode.com/todos/' + arg);
    await new Promise(resolve => setTimeout(resolve, 1000 + (arg * 200)))
    console.log('result: ' + JSON.stringify(result));
    return result;
}

for (let i = 0; i < 10; i += 1) {
    queue.push(i + 1);
}
