const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'simpleapp',
    password: '111111',
    port: 5433,
});

/*pool.query('CREATE TABLE IF NOT EXISTS posts (' +
    'id SERIAL PRIMARY KEY,' +
    'body TEXT) ')
    .then(result=>{
        console.log(result.rowsAffected);
    })*/


/* pool.query('INSERT INTO posts (id, body) VALUES (DEFAULT, $1) ', ['aaaAAAAaaaaAAAAaaaaaaaaa'])
    .then(result=>{
        console.log(result);
    })  */

/* pool.query('UPDATE posts SET body=$2 WHERE id=$1 ', [2, 'bbbBBBBbbbbbbbbbbb'])
    .then(result=>{
        console.log(result.rowCount);
    })  */

/* pool.query('DELETE FROM posts WHERE id=$1 ', [3])
    .then(result=>{
        console.log(result.rowCount);
    })  */

pool.query('SELECT * FROM posts')
    .then(function(result) {
        console.log(result.rows);
    })



console.log('Here ');
//console.log(pool.query('SELECT * FROM posts'))

pool.end();