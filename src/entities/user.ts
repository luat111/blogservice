import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Blog } from './blog';
import { Comment } from './comment';
import { Rate } from './rate';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, unique: true })
    username: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    fullname: string

    @Column()
    @IsEmail({}, { message: 'Incorrect Email' })
    email: string

    @Column({ type: 'timestamp', nullable: false })
    DoB: Date

    @Column()
    @Length(9, 11, { message: 'The phone number must be at least 9 but not longer than 11 characters' })
    phone: string

    @Column({ default: true })
    isActive: boolean

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Rate, (rate) => rate.user)
    rates: Rate[]
}