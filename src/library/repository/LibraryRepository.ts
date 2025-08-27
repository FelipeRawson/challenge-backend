import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { LibraryEntryEntity } from '../entity/LibraryEntryEntity';
import { BookEntity } from '../../book/entity/BookEntity';


export class LibraryRepository {
    private repo: Repository<LibraryEntryEntity>;
    private bookRepo: Repository<BookEntity>;
    constructor() {
        this.repo = AppDataSource.getRepository(LibraryEntryEntity);
        this.bookRepo = AppDataSource.getRepository(BookEntity);
    }


    async list() {
        return this.repo.find();
    }


    async add(bookId: string) {
        const book = await this.bookRepo.findOne({ where: { id: bookId } });
        if (!book) throw new Error('BOOK_NOT_FOUND');

        const entry = this.repo.create({ book });
        return this.repo.save(entry);
    }


    async remove(bookId: string) {
        const entry = await this.repo
            .createQueryBuilder('e')
            .leftJoinAndSelect('e.book', 'b')
            .where('b.id = :id', { id: bookId })
            .getOne();
        if (!entry) throw new Error('NOT_IN_LIBRARY');
        await this.repo.remove(entry);
    }
}