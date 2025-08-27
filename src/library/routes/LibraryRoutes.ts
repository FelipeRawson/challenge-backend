import { Router } from 'express';
import { addToLibrary, getLibrary, removeFromLibrary } from '../controller/LibraryController';


export const libraryRoutes = Router();
libraryRoutes.get('/', getLibrary);
libraryRoutes.post('/', addToLibrary);
libraryRoutes.delete('/:id', removeFromLibrary);