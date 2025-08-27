import { Request, Response } from 'express';
import { LibraryService } from '../service/LibraryService';

const service = new LibraryService();

export const getLibrary = async (_: Request, res: Response) => {
    const list = await service.list();
    res.json(list);
};

export const addToLibrary = async (req: Request, res: Response) => {
    const { bookId } = req.body;
    if (!bookId) {
        return res.status(400).json({ error: 'bookId required' });
    }
    try {
        const entry = await service.add(bookId);
        return res.status(201).json(entry);
    }
    catch (e: any) {
        if (e.message === 'BOOK_NOT_FOUND') return res.status(404).json({ error: 'Book not found' });
        if (e.code === 'SQLITE_CONSTRAINT' || e.message.includes('duplicate')) return res.status(409).json({ error: 'Already in library' });
        return res.status(500).json({ error: 'Internal error' });
    }
};

export const removeFromLibrary = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'id required' });
        return;
    }
    try {
        await service.remove(id);
        return res.status(204).send();
    }
    catch (e: any) {
        if (e.message === 'NOT_IN_LIBRARY') return res.status(404).json({ error: 'Not in library' });
        return res.status(500).json({ error: 'Internal error' });
    }
};