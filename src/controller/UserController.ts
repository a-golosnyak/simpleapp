import { BaseContext } from 'koa';
import { Post } from '../entity/post';
import { getManager, Repository, Not, Equal } from 'typeorm';

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
        ctx.status = 200;
        // ctx.body = ctx.request.body;

        ctx.body = {
            access_token:   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vMoYAFCoBN_GW4Q_Gnhr-qCUa5OOf64V9tcJI5yA1eA',
            token_type:     'Bearer',
            expires_at:     'success',
            user_id:        '1',
        };

    }

    public static async register(ctx: BaseContext) {



    }
}