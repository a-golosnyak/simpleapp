import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
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
import { Comment } from './Comment';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(5)
    @MaxLength(200)
    title: string;

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

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @OneToMany(type => Comment, comment => comment.post) // note: we will create author property in the Photo class below
    comment: Comment;
}
