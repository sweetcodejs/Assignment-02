var http = require('http');
var express = require('express');
var multer = require('multer');


var app = express();

var storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads')
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('myFile')


http.createServer(function (req, res) {
    if (req.url == "/") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>This is Home page</h1>')
        res.end();
    } else if (req.url == "/about") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>This is About page</h1>')
        res.end();
    } else if (req.url == "/contact") {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>This is Contact page</h1>')
        res.end();
    } else if (req.url == "/file-write") {
        fs.writeFile('demo.txt', "Hello World", function (error) {
            if (error) {
                res.end("Fail! file writing fails.");
            } else {
                res.end("Okey! file writing success.");
            }
        });
    } else if (req.url == "/uploads") {
        app.post('/', function (req, res) {
            upload(req, res, function (error) {
                if (error) {
                    res.send('File upload fails')
                } else {
                    res.send('File upload success')
                }
            })
        });

    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>Content Not Found</h1>')
        res.end();
    }




}).listen(5500, function () {
    console.log('App is running...!');
});