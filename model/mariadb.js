const mariadb = require('mariadb');
const config = require('../config.js');
const _ = require('lodash');

const pool = mariadb.createPool(config.dbconfig);

exports.execute = async (sql, params) => {
    var conn;
    var binding = {};
    if(params) {
        binding = params;
    }

    try {
        conn = await pool.getConnection();
        var query = {
              sql: sql
            , namedPlaceholders: true
        }
        queryLog(sql, paramLog(binding));
        var data = await conn.query(query, binding);
        return data;
    }
    catch(err) {
        throw global.setError('mariadb error', err);
    }
    finally {
        await endConnection(conn);
    }
}

// 커넥션 종료
 const endConnection = async (conn) => {
    if(conn) {
        conn.end();
    }
}

// 쿼리 로그 START
const isAblePrintLog = false;
const queryLog = (...args) => {
    if(isAblePrintLog) {
        console.log('\r\n');
        console.log(`[[ ${new Date(new Date().getTime()) } ]]`)
        _.forEach(args, function(arg) {
            console.log(arg);
        })
    }
}
const paramLog = (queryParam) => {
    if(isAblePrintLog) {
        var params = '';
        for(key in queryParam) {
            params += `\r\n ${key}: ${queryParam[key]}`;
        }
        params += '\r\n';
        return params;
    }
}
const getByte = (item) => {
    var str = String(item);
    var byte = 0;
    for(var i = 0; i < str.length; ++i) {
        str.charCodeAt(i) > 127 ? byte += 2 : byte++;
    }
    return byte;
}
const rpad = (item, length, word) => {
    var rPadResult = item;
    for(var i = 0; i <(length - getByte(item) + 2); i++) {
        rPadResult += word;
    }
    return rPadResult;
}
const createDash = (length) => {
    var dash = '';
    for(var i = 0; i < length + 1; i++) {
        dash += '-';
    }
    return dash + ' ';
}
const RESULT_LOG_MAX_LINE = 30; // resultLog 최대 출력 결과
const isAblePrintResultLog = true; // resultLog 출력 여부
const resultLog = (resultSet) => {
    if(isAblePrintResultLog) {
        var resultRows = resultSet;

        if(isEmpty(resultRows)) {
        }
    }
}
// 쿼리 로그 END