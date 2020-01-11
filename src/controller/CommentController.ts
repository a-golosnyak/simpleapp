import { BaseContext } from 'koa';
import { Comment } from '../entity/comment';
import { getManager, Repository, Not, Equal } from 'typeorm';

export default class CommentController {

    public static async index(ctx: BaseContext) {
        const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
        const comments: Comment[] = await commentRepository
            .createQueryBuilder('comment')
            .orderBy('id')
            .getMany();

        ctx.status = 200;
        ctx.body = comments;
    }

    public static async show(ctx: BaseContext) {
        const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
        // const comment = await postRepository.findOne((+ctx.params.id || 0), {relations: ['user']});

        const comment: Comment = await commentRepository.findOne((+ctx.params.id || 0));

        ctx.status = 200;
        ctx.body = comment;
    }

}