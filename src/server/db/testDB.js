const db = require('./connect-pg');

const qry = 'SELECT * FROM users';
const qry2 = `INSERT INTO users VALUES(DEFAULT,'dl','pwrd','test@exxxxample.com')`;

db.query(qry).then(data => {
    console.log(data.rows);
})
.catch(err => console.log(err));















// const createTcpPool = require('./connect-tcp.js');

// const createPool = async (pool) => {
//     return createTcpPool(pool);
// };

// const testCreate = () => {createPool({}).then(
//     pool => {console.log("test");
//             pool.schema.createTable('users', table => {
//                 table.increments('user_id').primary();
//                 table.specificType('email','VARCHAR').notNullable();
//             })                 }
// )
// .catch(err => console.log(err))};
// // testCreate();

// const insertUser = async (pool, user) => {
//     try {
//       return await pool('users').insert(user);
//     } catch (err) {
//       throw Error(err);
//     }
//   };

//   const user = {
//     email: 'test2@example.com'
//   };

//   const post = async (item) => {
//     const pool = await createPool({});
//     try {
//         await insertUser(pool, item)
//     } catch (err) {
//         console.log(err);
//         return;
//     }
//   };



// const testInsert = () => {createPool({}).then(
//     pool => {console.log("reached here");
//              pool('users').insert(user);
//             })               
// .catch(err => console.log(err))};

// // testInsert();


// const getUsers = () => {createPool({}).then(

//     pool => {
//         return pool.select().table('users');
//     })
// .then(
//     res => console.log(res))
// .catch(
//     err => console.log(err))
// };

// // let test;

// const getUsers2 = () => {
//     createPool({})
//     .then(
//         pool => {console.log("reached here");
//             return pool.raw('select * from users');
            
//         }
//     )
//     .then((res) => {console.log("reached here2");
//                      console.log(res)})
//     .catch(err => console.log(err))
// };

// getUsers2();

// //  getUsers();
// //   post(user);



  

  