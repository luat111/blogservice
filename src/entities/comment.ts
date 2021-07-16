import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from './user';
import { Blog } from './blog';

@Entity({ name: 'comment' })
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    content: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modifiedDate: Date

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn()
    user: User

    @ManyToOne(() => Blog, (blog) => blog.comments)
    @JoinColumn()
    blog: Blog

    @ManyToOne(() => Comment, (comment) => comment.childComments)
    @JoinColumn()
    childComments: Comment[]

}