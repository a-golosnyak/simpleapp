import * as Router from 'koa-router';

import homeController from './controller/homeController';
import postController from './controller/PostController';
import userController from './controller/UserController';

const guestRouter = new Router();

// router.all('[^/]+',              homeController.index);
// router.get('/',                 homeController.index);
// router.get('/test',            homeController.indexTest);
// router.get('/:name',            homeController.indexName);


guestRouter.get('/api',             homeController.index);

guestRouter.get('/api/post', 	    postController.index);

guestRouter.post('/api/login',      userController.login);

guestRouter.get('/post/:id(\\d+)', (ctx) => {
        ctx.redirect('/');
    });

guestRouter.get('/comment/:id(\\d+)', (ctx) => {
        ctx.redirect('/');
    });

export { guestRouter };