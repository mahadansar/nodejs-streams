const { createReadStream, createWriteStream } = require("fs");
const readStream = createReadStream("../../video.mp4");
const writeStream = createWriteStream("../../videoCopy.mp4");

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

readStream.on("end", () => {
  console.log("Read Stream Finished");
  writeStream.end();
});

readStream.on("error", (err) => {
  console.log("Error");
  console.error(err);
});

writeStream.on("close", () => {
  process.stdout.write("File Copied\n");
});
