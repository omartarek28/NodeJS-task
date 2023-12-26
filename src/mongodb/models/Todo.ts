import { Schema, model, Document } from 'mongoose';

interface IToDo extends Document {
  title: string;
  userId: Schema.Types.ObjectId;
}

const toDoSchema = new Schema<IToDo>({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const ToDoModel = model<IToDo>('ToDo', toDoSchema);

export default ToDoModel;