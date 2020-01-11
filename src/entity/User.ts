import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(3)
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(6)
    password: string;

    @Column({
        nullable: true,
    })
    age: number;

    @OneToMany(type => Post, post => post.user) // note: we will create author property in the Photo class below
    posts: Post;

    @OneToMany(type => Comment, comment => comment.user) // note: we will create author property in the Photo class below
    comments: Comment;
}
