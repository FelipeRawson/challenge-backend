import { Request, Response } from 'express';
import { BookService } from '../service/BookService';

const service = new BookService();

export const getBooks = async (req: Request, res: Response) => {
    const { search, genre, author } = req.query as any;
    const books = await service.list({ search, genre, author });
    res.json(books);
};


export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Missing book id' });
        const book = await service.get(id);
        if (!book) return res.status(404).json({ error: 'Not found' });
        return res.json(book);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};