import { BookRepository } from '../repository/BookRepository';


export class BookService {
    constructor(private repo = new BookRepository()) {}


    list(params: { search?: string; genre?: string; author?: string }) {
        return this.repo.findAll(params);
    }


    get(id: string) {
        return this.repo.findById(id);
    }
}