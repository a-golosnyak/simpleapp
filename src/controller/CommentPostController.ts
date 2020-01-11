import { BaseContext } from 'koa';
import { Comment } from '../entity/comment';
import { getManager, Repository, Not, Equal } from 'typeorm';

export default class CommentPostController {

    public static async index(ctx: BaseContext) {
         const commentRepository: Repository<Comment> = getManager().getRepository(Comment);
        /*const comments: Comment[] = await commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .where('comment.post_id = :id', { id: (+ctx.params.id || 0)} )
            .orderBy('id')
            .getMany();
*/
        const comments: Comment[] = await commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .where('comment.post_id = :id', { id: (+ctx.params.id || 0)} )
            .getMany();

        ctx.status = 200;
        ctx.body = comments;
    }
}