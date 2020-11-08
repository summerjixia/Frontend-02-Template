let http = require('http');
let fs = require('fs');

let outFile = fs.createWriteStream("../server/public/index.html");

http.createServer(function (request, response) {
    console.log(request.headers)
    request.on('data', chunk => {
        outFile.write(chunk);
        console.log(chunk.toString());
    })
    request.on('end', chunk => {
        outFile.end();
        response.end('chunk');
    })
}).listen(8082)