import express from 'express';
import { addTodo, updateTodo, deleteTodo, getTodo, getAllTodo } from '../controllers/user';

const router = express.Router();

router.post('/user/:userId/todo', addTodo);
router.put('/user/:userId/todo/:todoId', updateTodo);
router.delete('/user/:userId/todo/:todoId', deleteTodo);
router.get('/user/:userId/todo/:todoId', getTodo);
router.get('/user/:userId', getAllTodo);


export default router;