const mariadb = require('mariadb');
const config = require('./config.js');
 
const pool = mariadb.createPool(config.dbconfig);

exports.getUserList = async function(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        result = await conn.query('SELECT * FROM SJP.users');
        return result;
    }
    catch(err){
        throw err;
    }
    finally{
        await endConnection(conn);
    }
}

const endConnection = async (conn) => {
    if(conn) {
        conn.end();
    }
}
