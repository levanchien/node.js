'use strict'

var queue = require('fastq')(worker, 3)

for (let i = 0; i < 10; i += 1) {
    queue.push(42, function (err, result) {
        if (err) { throw err }
        console.log('the result is', result)
    })
}

async function worker(arg, cb) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    cb(null, 42 * 2)
}