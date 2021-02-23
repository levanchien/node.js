const Stream = require('stream');
const transformStream = new Stream.Transform;

const readableStream = new Stream.Readable({
  read() {}
});
readableStream.on('close', () => {
  console.log('Finish');
});


const writableStream = new Stream.Writable();
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
}

transformStream._transform = (chunk, encoding, callback) => {
  const _chunk = chunk.toString().toUpperCase();
  callback(null, _chunk);
}

readableStream.pipe(transformStream).pipe(writableStream);

readableStream.push('x');
readableStream.push('y');
readableStream.push('z');
