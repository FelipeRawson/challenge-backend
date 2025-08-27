import { Router } from 'express';
import { getBooks, getBookById } from '../controller/BookController';

export const bookRoutes = Router();
bookRoutes.get('/', getBooks);
bookRoutes.get('/:id', getBookById);