let http = require('http');
let https = require('https');
let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');

//2. auth路由(http://localhost:8082/auth):接受code,用code+client_id+client-secret换取token
function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    getToken(query.code, function (info) {
        response.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`);
        response.end();
    });
}
function getToken(code, callback) {
    let request = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.a936cfc4154cde86&client_secret=3799f03b8f52ed0c877e8a84bd0ce80a846b89a4`,
        port: 442,
        method: "POST"
    }, function (response) {
        let body = ""
        response.on('data', chunk => {
            body += chunk.toString();
        })
        response.on('end', chunk => {
            callback(querystring.parse(body))
        })
    })
    request.end();
}
//4. publish路由：用token获取用户信息，判断权限，接受发布
function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    getUser(query.token, function (info) {
        if (info.login === "summerjixia") {
            request.pipe(unzipper.Extract({ path: "../server/public/" }))
            request.on("end", () => {
                response.end("success!")
            })
        }
    });
}
function getUser(token, callback) {
    let request = https.request({
        hostname: "api.github.com",
        path: `/user`,
        port: 442,
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "toy-test-publish"
        }
    }, function (response) {
        let body = ""
        response.on('data', chunk => {
            body += chunk.toString();
        })
        response.on('end', chunk => {
            callback(JSON.parse(body))
        })
    })
    request.end();
}

http.createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response);
    }
    request.pipe(unzipper.Extract({ path: "../server/public/" }))
}).listen(8082)