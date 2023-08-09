# LESSON 8:
## Run project with Web client UI mode
## Enhance restful using asign await fucntions

# LESSON 7: complete restful API CRUD for Room entry.

## configs
-- Noi thiet lap cau hinh he thong

## controllers
-- Xu ly logic he thong

## helpers
-- Chua nhung functions co the tai su dung

## middlewares
-- Chua nhung dich vu phai call den ben thu 3

## migration
-- Chua nhung thay doi ve database
-- Including any changes about database

## models
-- Tao entry cho cac doi tuong, tac nhan tham gia he thong
-- Including set of entry object, they will be take part in the system

## public
-- Chua nhung file tinh, co the goi tu clients
-- Including system files that's able to call from client side

## routes
-- Thiet lap dieu huong he thong
-- System navigates configuations

## seeder
-- Mock data phuc vu viec testing
-- Mock data provide for testing

## services
-- Chua nhung services, query call den DB
-- Including script that will be call to database

## views
-- Chua code UI he thong
-- HTML

# EXPORT DEFAULT:
- What you are export, default it will be used when you call.
- For example:
-- modules.export = myfunction
- So, when you require the file which including 'myfunction':
-- const myfunct = require (filename.include.module.export);
=> it will be reference that function thought you set any name for it

# SOME PROBLEMS NEED TO CARE IN DEVELOPING - KEYWORDS
- Database rate limit
- Connection never close
- Connection cost
- Performace
- Connection pooling // Connection pool pattern
-- Giam thoi gian ket noi den CSDL bang cach tai su dung (reusing) cac ket noi truoc do.
-- Han che viec ung dung bi qua tai (overload) - He thong co the cham nhung khong the bi sap.

# CONNECTION POOLINGS PERFORMANCE
```js
// persistent connection: ket noi lien tuc
app.get('/old', (req, res) => {
  try {
    let totalExec = 0; // Total execute time
    for (let i = 0; i < 1000; i++) { // vong lap de thuc hien ket noi 1000 lan
      let pre_query = new Date().getTime(); // thoi gian bat dau thuc hien ket noi
      let con = null; // khai bao ket noi
      con = mysql.createConnection({ // thuc hien ket noi persistent connection
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      })

      con.query( // cau truy van
        'SELECT * FROM room',
        (err, result) => {
          const post_query = new Date().getTime(); // thoi gian sau khi ket noi thanh cong va lay duoc ket qua
          const duration = (post_query - pre_query) / 1000; // thoi gian thuc hien 1 ket noi (unit: second)
          totalExec += duration; // cong don cho tong thoi gian thuc hien cua 1000 ket noi

          if (i == 999) { // khi thuc hien den ket noi thu 1000
            const ave = totalExec / 1000; // trung binh thoi gian ket noi
            return res.send(`Average: ${ave}`); // tra ve ket qua
          }
        }
      )

      con.destroy(); // Close connection
    }
  }
  catch (e) {
    console.log(`check error old: ${e}`);
  }
});

// connection pooling: Tai su dung ket noi
app.get('/pool', (req, res) => { // cach thuc hien tuong tu PERSISTENT CONNECTION
  try {
    let totalExec = 0;
    for (let i = 0; i < 1000; i++) {
      let pre_query = new Date().getTime();
      let con = null;
      con = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        queueLimit: 0,
        connectionLimit: 10,
        waitForConnections: true
      })

      con.query(
        'SELECT * FROM room',
        (err, result) => {
          const post_query = new Date().getTime();
          const duration = (post_query - pre_query) / 1000; // unit: second
          totalExec += duration;

          if (i == 999) {
            const ave = totalExec / 1000;
            return res.send(`Average: ${ave}`);
          }
        }
      )
    }
  }
  catch (e) {
    console.log(`check error old: ${e}`);
  }
});
```

## BODY PARSER
https://github.com/expressjs/body-parser