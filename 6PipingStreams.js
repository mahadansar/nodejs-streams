const { createWriteStream } = require("fs");

const writeStream = createWriteStream("./6file.txt");

//readStream.pipe(writeStream).on("error", console.error);

process.stdin.pipe(writeStream);
