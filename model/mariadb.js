const mariadb = require('mariadb');

const dbconfig = {
    host            : 'database-1.cmghvtfx9gsq.ap-northeast-2.rds.amazonaws.com'
  , port            : '3306'
  , user            : 'admin'
  , password        : 'tmdwns45!7'
  , connectionLimit : 5 
}
 
const pool = mariadb.createPool(dbconfig);

exports.execute = async (query, params) => {
    var conn;
    var binding = {};
    if(params) {
        binding = params;
    }
      try {
          conn = await pool.getConnection();
          result = await conn.query(query, binding);
          return result;
      }
      catch(err) {
          throw err;
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
