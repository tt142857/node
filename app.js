const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);

const hostname = '172.31.41.85';
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/public", express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/test', (req, res) => {
  res.render('test');
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`connect on http://ec2-15-164-129-37.ap-northeast-2.compute.amazonaws.com:${port}`);
});

module.exports = app;