import { LibraryRepository } from '../repository/LibraryRepository';

export class LibraryService {
    constructor(private repo = new LibraryRepository()) {}

    list() { return this.repo.list(); }
    add(bookId: string) { return this.repo.add(bookId); }
    remove(bookId: string) { return this.repo.remove(bookId); }
}