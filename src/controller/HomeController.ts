import { BaseContext } from 'koa';
import { createReadStream } from 'fs';
const crypto = require('crypto');

export default class HomeController {

    public static async index(ctx, next) {
        ctx.type = 'html';
        ctx.set('Cache-Control', 'no-cache');
        // ctx.append('aaaaaaaaaaaaaaa', 'AAAAAAAAAAAAAAAA');
        await ctx.render('index.ejs', {
            csrf_token: 'AAa a a sd asd aaaaaa a AAAAaaaaAAaaAAaaaAaAa aAaAaAa AA'
        });

        // ctx.body = createReadStream('public/index.html');
    }

    public static indexTest(ctx: BaseContext) {
        ctx.body = 'Hello dear!!!';
    }

    public static indexName(ctx: BaseContext) {
        ctx.body = 'Hello ' + ctx.params.name;
    }

}