import * as Router from 'koa-router';

import postController from './controller/postController';
import commentController from './controller/commentController';
import commentPostController from './controller/commentPostController';

const authRouter = new Router();

// authRouter.get('/api/post', 	        postController.index);
authRouter.get('/api/post/:id', 	    postController.show);
authRouter.get('/api/post/comment/:id', commentPostController.index);

authRouter.get('/api/comment', 	        commentController.index);
authRouter.get('/api/comment/:id', 	    commentController.show);

/*
router
    // .use(authenticated())
    .get('/api/post', 	    postController.index)
    .get('/api/post/:id', 	postController.show);
router.use('/post', router.routes());*/

export { authRouter };