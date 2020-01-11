import * as Router from 'koa-router';

import homeController from './controller/homeController';
import { authRouter } from './authRoutes';
import postController from './controller/PostController';

const guestRouter = new Router();

// router.all('[^/]+',              homeController.index);
// router.get('/',                 homeController.index);
// router.get('/test',            homeController.indexTest);
// router.get('/:name',            homeController.indexName);

guestRouter
  .get('/', homeController.index)

guestRouter.get('/api/post', 	   postController.index);

guestRouter.get('/post/:id(\\d+)', (ctx) => {
        ctx.redirect('/');
    });

guestRouter.get('/comment/:id(\\d+)', (ctx) => {
        ctx.redirect('/');
    });

export { guestRouter };