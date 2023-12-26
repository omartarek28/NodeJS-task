import { Request, Response } from 'express';
import UserModel from '../../mongodb/models/User';
import ToDoModel from '../../mongodb/models/Todo';


export const addTodo = async (req: Request, res: Response): Promise<any> => {
  
  try {
    const userId = req.params.userId;
    const { title } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const newToDo = new ToDoModel({
      title,
      userId
    });

    await newToDo.save();

    res.status(201).json(newToDo);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  const {userId, todoId} = req.params;
  
    try {
      const updatedToDo = await ToDoModel.findByIdAndUpdate({ _id: todoId, userId }, req.body, { new: true });
  
      if (!updatedToDo) {
        return res.status(404).send('ToDo not found');
      }
  
      res.status(200).json(updatedToDo);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
};
export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  const {userId, todoId} = req.params;
  try {
    const deletedToDo = await ToDoModel.findOneAndDelete({ _id: todoId, userId: userId });

    if (!deletedToDo) {
      return res.status(404).send('ToDo not found');
    }

    res.status(200).send('ToDo successfully deleted');
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
export const getTodo = async (req: Request, res: Response): Promise<any> => {
  const {userId, todoId} = req.params;
  try {
    const toDo = await ToDoModel.findOne({ _id: todoId, userId: userId });

    if (!toDo) {
      return res.status(404).send('ToDo not found');
    }

    res.status(200).json(toDo);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllTodo = async (req: Request, res: Response): Promise<any> => {
  const {userId} = req.params;
  try {
    const toDo:any = await ToDoModel.find({ userId: userId });

    if (!toDo && toDo.length == 0) {
      return res.status(404).send('ToDo not found');
    }

    res.status(200).json(toDo);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};