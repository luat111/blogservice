import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from './user';
import { Comment } from './comment';
import { Rate } from "./rate";

@Entity({ name: 'blog' })
export class Blog {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    title: string

    @Column({ nullable: false })
    content: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modifiedDate: Date

    @ManyToOne(() => User, (user) => user.blogs)
    @JoinColumn()
    user: User

    @OneToMany(() => Comment, (comment) => comment.blog)
    comments: Comment[]

    @OneToMany(() => Rate, (rate) => rate.blog)
    rates: Rate[]

}