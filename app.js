const http = require('http');
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

// const hostname = '172.31.41.85';
const hostname = 'localhost';
const port = 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login/login'));

// 서버 시작 시 출력되는 문구
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`If you start in AWS, connect on http://ec2-15-164-129-37.ap-northeast-2.compute.amazonaws.com:${port}`)
});

const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// body-parser 사용 시 헤더방식을 application/json으로 데이터를 받을 수 있게 처리함
app.use(express.json({ limit : "50mb" }));

/*
  body-parser 필수 옵션 application/x-www-form-urlencoded
  extended : true => qs 모듈을 사용
             false => query-string 모듈을 사용 
*/
app.use(express.urlencoded({
      limit : "50mb"
    , extended : true
  })
);

// console.log(app);

module.exports = app;