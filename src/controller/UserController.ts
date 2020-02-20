import { BaseContext } from 'koa';
import { User } from '../entity/user';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
// import jwt from 'koa-jwt';
const jwt = require('jsonwebtoken');


export default class UserController {
/*
    public static async index(ctx: BaseContext) {
        const UserRepository: Repository<User> = getManager().getRepository(User);
        const Users: User[] = await UserRepository
            .createQueryBuilder('User')
            .orderBy('id')
            .getMany();

        ctx.status = 200;
        ctx.body = Users;
    }


    public static async show(ctx: BaseContext) {
        const UserRepository: Repository<User> = getManager().getRepository(User);
        const User = await UserRepository.findOne((+ctx.params.id || 0), {relations: ['user', 'comment']});

        ctx.status = 200;
        ctx.body = User;
    }
*/
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

    public static async register(ctx: BaseContext) {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // build up entity user to be saved
        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.password = ctx.request.body.password;

        // validate user entity
        const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if ( await userRepository.findOne({ email: userToBeSaved.email}) ) {
            // return BAD REQUEST status code and email already exists error
            ctx.status = 400;
            ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the user contained in the User body
            const user = await userRepository.save(userToBeSaved);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }
}