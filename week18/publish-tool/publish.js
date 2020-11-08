let http = require('http');
let fs = require('fs');


let request = http.request({
    hostname: "127.0.0.1",
    port: 8882,
    method: 'post',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, response => {
    // console.log(response)
})

let file = fs.createReadStream("./sample.html");

file.on('data', chunk => {
    request.write(chunk.toString())
})

file.on('end', chunk => {
    console.log('fs end');
    request.end();
})
