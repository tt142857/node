const path = require('path');
const db = require(path.join(global.contextPath, 'model/mariadb.js'));

exports.selectUserList = async () => {
    var sql = `
        SELECT *
          FROM SJP.USERS
    `;
    var result = db.execute(sql);
    return result;
}

exports.checkId = async (params) => {
    var sql = `
        SELECT 1
          FROM SJP.USERS
         WHERE 1 = 1
           AND USER_ID = :id
    `;

    var result = db.execute(sql, params);
    return result;
}
exports.selectUserOneWithId = async (params) => {
    var sql = `
        SELECT USER_ID
             , USER_PW
             , USER_NM
             , USER_HP
             , USER_EMAIL
             , CRTN_DT
             , CRTN_IP
             , UPDT_DT
             , UPDT_IP
             , LAST_LOGIN_DT
             , LAST_LOGIN_IP
          FROM SJP.USERS
         WHERE 1 = 1
           AND USER_ID = :id
    `;

    var result = db.execute(sql, params);
    return result;
}

exports.selectUserOneWithIdPw = async (params) => {
    var sql = `
        SELECT USER_ID
             , USER_PW
             , USER_NM
             , USER_HP
             , USER_EMAIL
             , LAST_LOGIN_DT
             , LAST_LOGIN_IP
          FROM SJP.USERS
         WHERE 1 = 1
           AND USER_ID = :id
           AND USER_PW = :pw
    `;

    var result = db.execute(sql, params);
    return result;
}

exports.insertUser = async (params) => {
    var sql = `
        INSERT INTO SJP.USERS (
              USER_ID
            , USER_PW
            , USER_NM
            , USER_HP
            , USER_EMAIL
            , CRTN_DT
            , CRTN_IP
            , UPDT_DT
            , UPDT_IP
            , LAST_LOGIN_DT
            , LAST_LOGIN_IP
        ) VALUES (
              :id
            , :pw
            , :nm
            , :hp
            , :email
            , SYSDATE()
            , :ip
            , SYSDATE()
            , :ip
            , null
            , null
        )
    `;
    
    var result = db.execute(sql, params);
    return result;
}

exports.updateLoginInfoUser = (params) => {
    var sql = `
        UPDATE SJP.USERS
           SET LAST_LOGIN_DT = SYSDATE()
             , LAST_LOGIN_IP = :ip
         WHERE 1 = 1
           AND USER_ID = :id
           AND USER_PW = :pw
    `;

    var result = db.execute(sql, params);
    return result;
}