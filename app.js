const http = require('http');
const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const qs = require('querystring');

const app = express();
const server = http.createServer(app);

// const hostname = '172.31.41.85';
const hostname = 'localhost';
const port = 8080;

// body-parser START
/* 
  body-parser가 경로를 매핑하는 코드보다 뒤에 있을 시 실행되지 않음
  express v.16 이후는 express를 쓰고 이전버전은 body-parser를 직접 install해서 사용해야 함
  사용 시 헤더방식을 application/json으로 데이터를 받을 수 있게 처리함
*/
app.use(express.json({ limit : "50mb" }));
/*
  application/x-www-form-urlencoded
  extended : true => qs 모듈을 사용
             false => query-string 모듈을 사용 
*/
app.use(express.urlencoded({
    limit : "50mb"
  , extended : true
  })
);
// body-parser END

// Validator START
app.use(
  expressValidator({
    customValidators: {
      isEmptyInt: value => {
        if(typeof value === "undefined" || value === null || value === "null" || value === "") {
          return true;
        }
        return Number.isInteger(Number(value));
      },
      isArray: (value, optional) => {
        if(optional) {
          if(typeof value === "undefined" || value === null || value === "null") {
            return true;
          }
        }
        if(!Array.isArray(value)) {
          return Array.isArray(JSON.parse(value));
        }
        return Array.isArray(value);
      },
      gte: (param, num) => {
        return param >= num;
      }
    },
    customSanitizers: {
      toArray: value => {
        if(typeof value === "undefined" || value === null || value === "null") {
          value = [];
        } else {
          if(!Array.isArray(value)) {
            value = JSON.parse(value);
          }
        }
        return value;
      },
      xssCheck: value => {
        if(typeof value === "undefined" || value === null || value === "null") {
          value = '';
        } else {
          if(typeof value === "string") {
            value = value.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/<|&lt;\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>|&gt;]*?/gi, "");
          }
        }
        return value;
      }
    }
  })
);
// Validator END

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/public", express.static(path.join(__dirname, "public")));

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

// 경로 매핑은 최대한 아래로 맞춰야 함
// body-parser가 인식되지 않을 수 있기 때문
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
// app.use('/login', require('./routes/users/login'));

module.exports = app;