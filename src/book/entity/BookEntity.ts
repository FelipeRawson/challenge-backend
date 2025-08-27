import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';


@Entity({ name: 'books' })
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @Index()
    title!: string;

    @Column()
    @Index()
    author!: string;

    @Column()
    @Index()
    genre!: string;

    @Column({ type: 'text' })
    synopsis!: string;


    @Column({ type: 'int', nullable: true })
    year?: number;
}