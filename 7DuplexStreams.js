const { Duplex, PassThrough } = require("stream");
const { createReadStream, createWriteStream } = require("fs");

const readStream = createReadStream("../video.mp4");
const writeStream = createWriteStream("../videoCopy.txt");

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }
  _read() {}

  _final() {
    this.push(null);
  }
}

// Duplex Stream @ PassThrough
const report = new PassThrough();

const throttle = new Throttle(1000);

var total = 0;
report.on("data", (chunk) => {
  total += chunk.length;
  console.log("Total Bytes Transferred: ", total);
});

//Duplex Stream will take data from readStream and pass it to WriteStream
readStream.pipe(throttle).pipe(report).pipe(writeStream);
