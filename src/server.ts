import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import { guestRouter } from './guestRoutes';
import { authRouter } from './authRoutes';
import 'reflect-metadata';
import { createConnection as createDbConnection, } from 'typeorm';
// import bodyParser from 'koa-bodyparser';
// import { CSRF } from 'koa-csrf';
// import { convert } from 'koa-convert';
// import  session  from 'koa-session';
// import * as serve from 'koa-static';
import * as Router from 'koa-router';

const session = require('koa-session');
// const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
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
    app.use(Logger());

    app.use(serve('./public')); // serving static files

    // x-response-time
    // app.use(async function (ctx, next) {
    //     console.log('x-response-time');
    //   const start: Date = new Date();
    //   await next();
    //   // const ms = new Date() - start;
    //   ctx.set('AaaaaaaaaaaaA',  'BbbbbbbbbbbbbbbbbbbB');
    // });

    app.use(bodyParser());
    app.use(guestRouter.routes()).use(guestRouter.allowedMethods());
    app.use(jwt({secret: process.env.JWT_SECRET}));
    app.use(authRouter.routes()).use(authRouter.allowedMethods());


    // Listen the port
    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });
