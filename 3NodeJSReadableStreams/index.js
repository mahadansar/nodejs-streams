const fs = require("fs");

const readStream = fs.createReadStream("../../video.mp4");

readStream.on("data", (chunk) => {
  console.log("Reading Video Chunk\n", chunk.length);
});

readStream.on("end", () => {
  console.log("Read Stream Finished");
});

readStream.on("error", (err) => {
  console.log("Error");
  console.error(err);
});

//convert readStream to non flowing mode
readStream.pause();

// Non flowing stream , you have to ask for data
process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "finish") {
    //convert back to flowing mode
    readStream.resume();
  }
  readStream.read();
});
