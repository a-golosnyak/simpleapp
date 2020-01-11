import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import { guestRouter } from './guestRoutes';
import { authRouter } from './authRoutes';
import 'reflect-metadata';
import { createConnection as createDbConnection, } from 'typeorm';
// import { bodyParser } from 'body-parser';
// import { CSRF } from 'koa-csrf';
// import { convert } from 'koa-convert';
// import  session  from 'koa-session';
// import * as serve from 'koa-static';
import * as Router from 'koa-router';

const session = require('koa-session');
// const convert = require('koa-convert');
const bodyParser = require('body-parser');
const CSRF = require('koa-csrf');
// const crypto = require('crypto');
// const csrf = require('koa-csrf-header');
const views = require('koa-views');
const serve = require('koa-static');
const jwt = require('koa-jwt');

    createDbConnection()
        .then(async connection => {
            // console.log('Db Connection created.');
        }).catch(error => console.log(error));

    const app = new Koa();

    // app.use((ctx, next) => {
    //     // ctx.response.message = 'Aaaaa';
    //     // ctx.append('aaa');
    //
    //     // ctx.body = process.env.JWT_SECRET;
    //     // ctx.body += ' ';
    //     // ctx.body += process.env.JWT_SECRET;
    //
    //     // ctx.body = ctx.request;
    //
    //     // ctx.body = generateToken;
    //
    //     // return next();
    // });

    app.use(views(__dirname + `/../public`), {
        extension: 'ejs'
    });

    // Development logging
    // app.use(Logger());

    app.use(serve('./public')); // serving static files

    app.keys = ['secret'];
    // app.use(session({}, app));

    app.use(new CSRF({
      invalidTokenMessage: 'Invalid CSRF token',
      invalidTokenStatusCode: 403,
      excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
      disableQuery: false
    }));
/*
    app.use((ctx, next) => {
        console.log('ctx.csrf');
        console.log(ctx.state.csrf);

        if (ctx.method === 'GET') {
            ctx.state.csrf = ctx.csrf;
        }
      return next();
    });
*/
    // x-response-time
    // app.use(async function (ctx, next) {
    //     console.log('x-response-time');
    //   const start: Date = new Date();
    //   await next();
    //   // const ms = new Date() - start;
    //   ctx.set('AaaaaaaaaaaaA',  'BbbbbbbbbbbbbbbbbbbB');
    // });

    app.use(guestRouter.routes());

    app.use(jwt({secret: process.env.JWT_SECRET}));

    app.use(authRouter.routes());

    // Protected middleware
    // app.use(function(ctx) {
    //     console.log('Protected middleware');
    //     if (ctx.url.match(/^\/api/)) {
    //         ctx.body = 'protected\n';
    //     }
    // });


    // Listen the port
    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });


    // generate the JWT
function generateToken(req) {
    const secret = process.env.JWT_SECRET;

    return jwt.sign({
        auth:  'magic',
        agent: req.headers['user-agent'],
        exp:   Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 // Note: in seconds!
    }, secret);  // secret is defined in the environment variable JWT_SECRET
}