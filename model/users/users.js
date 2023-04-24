const db = require('../mariadb.js');

exports.selectUserList = async () => {
    var query = `
        SELECT *
          FROM SJP.USERS
    `;
    var result = db.execute(query);
    return result;
}

exports.insertUser = async (params) => {
    console.log('params: ', params);
    var query = `
        INSERT INTO (
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
        ) VALUES (
              :id
            , :pw
            , :nm
            , :hp1
            , :email
            , SYSDATE()
            , 127.0.0.1
            , SYSDATE()
            , 127.0.0.1
            , SYSDATE()
        )
    `;
    
    db.execute(query, params);
}