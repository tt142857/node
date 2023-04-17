const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);

const hostname = '172.31.37.110';
const port = 3000;

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
});

module.exports = app;