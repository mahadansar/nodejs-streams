const { createReadStream, createWriteStream } = require("fs");

const readStream = createReadStream("../video.mp4");
const writeStream = createWriteStream("../videoCopy.mp4", {
  // highWaterMark: 1592338682,
});
// set highwatermark if you want to allocate any amount of memory to the streams
// but it may take up more memory and slow down other applications running
// no back pressure if the highWaterMark is very high because it can transfer large amounts of data

readStream.on("data", (chunk) => {
  const result = writeStream.write(chunk);
  if (!result) {
    //can't transfer more data @ write stream can't handle it, pause stream
    console.log("Back Pressure");
    readStream.pause();
  }
});

readStream.on("end", () => {
  console.log("Read Stream Finished");
  writeStream.end();
});

readStream.on("error", (err) => {
  console.log("Error");
  console.error(err);
});

writeStream.on("drain", () => {
  // can transfer more data, write stream can handle data now
  console.log("drained");
  readStream.resume();
});

writeStream.on("close", () => {
  process.stdout.write("File Copied\n");
});
