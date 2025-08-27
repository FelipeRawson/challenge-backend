import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { BookEntity } from '../../book/entity/BookEntity';


@Entity({ name: 'library' })
@Unique(['book'])
export class LibraryEntryEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @ManyToOne(() => BookEntity, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book!: BookEntity;
}