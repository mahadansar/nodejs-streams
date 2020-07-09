// consumes more memory because of mark sweep
// less efficient
// slower as it waits for whole file to load before sending

var fs = require("fs");
var http = require("http");
var file = "../../video.mp4";

http
  .createServer((req, res) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        console.log("Error: ", error);
      }
      res.writeHeader(200, { "Content-Type": "video/mp4" });
      res.end(data);
    });
  })
  .listen(3000, () => {
    console.log("Buffering Video @ localhost:3000");
  });
