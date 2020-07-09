// consumes less memory because scavange is the one collecting garbage
// more efficient
// more faster as it doesn't wait for the whole file to load

var fs = require("fs");
var http = require("http");
var file = "../../video.mp4";

http
  .createServer((req, res) => {
    res.writeHeader(200, { "Content-Type": "video/mp4" });
    fs.createReadStream(file).pipe(res).on("error", console.error);
  })
  .listen(3000, () => {
    console.log("Streaming Video @ localhost:3000");
  });
