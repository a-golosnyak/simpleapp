import { BaseContext } from 'koa';
import { Post } from '../entity/post';
import { getManager, Repository, Not, Equal } from 'typeorm';
// import jwt from 'koa-jwt';
const jwt = require('jsonwebtoken');

export default class UserController {

    public static async index(ctx: BaseContext) {
        const postRepository: Repository<Post> = getManager().getRepository(Post);
        const posts: Post[] = await postRepository
            .createQueryBuilder('post')
            .orderBy('id')
            .getMany();

        ctx.status = 200;
        ctx.body = posts;
    }

    public static async show(ctx: BaseContext) {
        const postRepository: Repository<Post> = getManager().getRepository(Post);
        const post = await postRepository.findOne((+ctx.params.id || 0), {relations: ['user', 'comment']});

        ctx.status = 200;
        ctx.body = post;
    }

    public static async login(ctx: BaseContext) {
        // ctx.body = ctx.request.body;

        // ctx.status = 200;
        // ctx.body = {
        //     access_token:   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vMoYAFCoBN_GW4Q_Gnhr-qCUa5OOf64V9tcJI5yA1eA',
        //     token_type:     'Bearer',
        //     expires_at:     'success',
        //     user_id:        '1',
        // };

        const secret = process.env.JWT_SECRET;

        const token = jwt.sign({
              sub: '1234567890',
              name: ctx.request.body.email,
              iat: 1516239022
        }, secret);  // secret is defined in the environment variable JWT_SECRET

        ctx.body = {
            access_token:   token,
            token_type:     'Bearer',
            expires_at:     'success',
            user_id:        '1',
        };

    }

    public static async; register(ctx: BaseContext) {


    }
}