import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn, BeforeInsert
} from 'typeorm';
import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
    IsDate
} from 'class-validator';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(5)
    body: string;

    @IsDate()
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @IsDate()
    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Post, post => post.comment)
    post: Post;
}
