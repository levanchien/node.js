var fs = require('fs');
 
var readStream = fs.createReadStream(__dirname + '/assets/input.txt');
var writeStream = fs.createWriteStream(__dirname + '/assets/output.txt');

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
