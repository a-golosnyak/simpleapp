import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import 'reflect-metadata';
import { createReadStream } from 'fs';
// import serve from 'koa-static';

const app = new Koa();
const router = new Router();

const serve = require('koa-static');

router.get('/', async (ctx) => {
//    const { rows } = await ctx.app.pool.query('SELECT $1::text as message', ['Hello, World!']);
//    ctx.body = rows[0].message;
    ctx.type = 'html';
    ctx.body = createReadStream('public/index.html');
});

router.get('/test', async (ctx) => {
//    const { rows } = await ctx.app.pool.query('SELECT $1::text as message', ['Hello, World!']);
//    ctx.body = rows[0].message;
    ctx.body = 'Hello dear!!!';
});

router.get('/:name', async (ctx) => {
//    const { rows } = await ctx.app.pool.query('SELECT $1::text as message', [`Hello, ${ctx.params.name}!`]);
//    ctx.body = rows[0].message;
    ctx.body = 'Hello ' + ctx.params.name;
});


const one = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Resolve done'), 1000);
//  setTimeout(() => reject('Error in promise'), 2000);
});



/*
one
    .then(resolve => {
      console.log(resolve);
    })
    .catch(reject => {
      console.log(reject);
    });
*/
// Development logging
app.use(Logger());
// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

app.use(serve('./public')); // serving static files

// Listen the port
app.listen(3000, () => {
  console.log('Server running on port 3000');
});