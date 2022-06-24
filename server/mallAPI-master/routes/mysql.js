// 1.引入mysql模块
let mysql = require('mysql')
// 2.创建连接池对象
let sqlOptions = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'supermall'
}


let con = mysql.createConnection(sqlOptions)




con.connect(err => {
  if (err) {
    console.log('错误信息：' + err);
  } else {
    console.log('数据库连接成功');
  }
});

function sqlQuery(strSql, arr) {
  return new Promise((resolve, reject) => {
    con.query(strSql, arr, (err, results) => {
      if (err) {
        reject('错误信息：' + err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = sqlQuery
