const mariadb = require('mariadb');
const config = require('../config.js');

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
            sql: sql,
            namedPlaceholders: true,
          }
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