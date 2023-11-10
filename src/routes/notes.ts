import express from 'express';
import verifyAccess from '../middlewares/verifyAccess';
import getNotes from '../controllers/notes/getNotes';
import noteServices from '../services/notes';
import deleteNotes from '../controllers/notes/delNotes';
const notesRouter = express.Router();

notesRouter.get('/', verifyAccess, getNotes);
notesRouter.post('/', verifyAccess, noteServices);

notesRouter.delete('/:id', verifyAccess, deleteNotes);

export default notesRouter;
