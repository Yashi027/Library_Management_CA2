import express from 'express';
import { addBook, getBooks, updateBook } from '../controller/BookController.js';

const router = express.Router();

router.get('/',getBooks);
router.post('/',addBook);
router.patch('/:id',updateBook);

export default router;