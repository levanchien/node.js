const fs = require('fs');

// Pharse I/O
fs.readFile("test-file.txt", function() {
    console.log('readFile');
});


// Pharse timer
setTimeout(() => {
    console.log('setTimeout');
}, 0);

// Pharse check
setImmediate(() => {
    console.log('setImmediate');
});


process.nextTick(() => console.log('process.nextTick'));
