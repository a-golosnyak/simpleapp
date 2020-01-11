import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';

createConnection().then(async connection => {
    console.log('Seeding...');

    // === User seeding ============================================================
    const user = new User();
        user.name = 'adm';
        user.email = 'adm@mail.ru';
        user.password = '111111';
        user.age = 20;
        await connection.manager.save(user);
    const user1 = new User();
        user1.name = 'admin';
        user1.email = 'admin@mail.ru';
        user1.password = '111111';
        user1.age = 25;
        await connection.manager.save(user1);

    // === Posts seeding ===========================================================
    for (let i = 0; i < 5; i++) {
        const post = new Post();
        post.title = Math.random().toString(36).substring(7) + ' Title';
        post.body = Math.random().toString(36).substring(7) + ' Body';
        post.user.id = 1;
        await connection.manager.save(post);
    }
    // === Comments seeding ========================================================
    for (let i = 0; i < 5; i++) {
        const comment = new Comment();
        comment.body = Math.random().toString(36).substring(7) + ' Comment body';
        comment.user.id = 1;
        comment.post.id = 1;
        await connection.manager.save(comment);
    }
    // =============================================================================

    console.log('Loading posts from the database...');
    const posts = await connection
        .getRepository(Post)
        .find({relations: ['user', 'comment']});

    console.log('Loaded posts: ', posts);
}).catch(error => console.log(error));