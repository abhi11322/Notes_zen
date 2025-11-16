import express from 'express';
import { createNote, getNotes, deleteNote ,updateNote } from '../controllers/notesController.js';
const router = express.Router();
router.post('/create', createNote);
router.get('/:userId', getNotes);
router.delete('/:id', deleteNote);
router.put("/updateNote/:id", updateNote);

export default router;