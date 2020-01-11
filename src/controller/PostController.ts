import { BaseContext } from 'koa';
import { Post } from '../entity/post';
import { getManager, Repository, Not, Equal } from 'typeorm';

export default class PostController {

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

}