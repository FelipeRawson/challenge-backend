import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { BookEntity } from '../entity/BookEntity';


export class BookRepository {
    private repo: Repository<BookEntity>;
    constructor() {
        this.repo = AppDataSource.getRepository(BookEntity);
}


async findAll(query?: { search?: string; genre?: string; author?: string }) {
    const qb = this.repo.createQueryBuilder('b');
    if (query?.search) {
        qb.andWhere('(LOWER(b.title) LIKE :q OR LOWER(b.synopsis) LIKE :q)', { q: `%${query.search.toLowerCase()}%` });}

    if (query?.genre) qb.andWhere('LOWER(b.genre) = :g', { g: query.genre.toLowerCase() });
    if (query?.author) qb.andWhere('LOWER(b.author) = :a', { a: query.author.toLowerCase() });
    
    qb.orderBy('b.title', 'ASC');
    return qb.getMany();
}


async findById(id: string) {
    return this.repo.findOne({ where: { id } });}

}