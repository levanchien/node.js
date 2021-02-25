var fs = require('fs');
const path = require('path');
 
var readStream = fs.createReadStream(path.join(__dirname, '...', '/assets/input.txt'));
var writeStream = fs.createWriteStream(path.join(__dirname, '...', '/assets/output.txt'));

readStream.setEncoding('utf8');

// Using pipe: by default a chunk = 64*1024 (64KB)
readStream.pipe(writeStream);

// Using event
readStream.on('data', function(chunk) {
    writeStream.write(chunk);
});

readStream.on('end', function() {
    console.log('End');
});
