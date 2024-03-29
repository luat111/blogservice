import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeUpdate, BeforeInsert } from "typeorm";
import { Min, Max, validateOrReject } from "class-validator";
import { User } from './user';
import { Blog } from './blog';

@Entity({ name: 'rate' })
export class Rate {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: 0 })
    @Min(0)
    @Max(5)
    rating: number

    @ManyToOne(() => User, (user) => user.rates)
    @JoinColumn()
    user: User

    @ManyToOne(() => Blog, (blog) => blog.rates)
    @JoinColumn()
    blog: Blog

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }

}