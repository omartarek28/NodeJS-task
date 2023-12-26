import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());

app.use('/api', todoRoutes);

const initializeConnections = () => {
    let server:any;
    try {
      mongoose.connect('mongodb://localhost:27017/todoApp');
  
      // 'connected' event fires on initial connection and reconnection to MongoDB
      mongoose.connection.on("connected", () => {
        console.log('Connected to MongoDB on port 27017');
        server = app.listen(3000, () => console.log('Server listening on port 3000'));
      });
  
      // 'disconnected' event firs on disconnection from MongoDB
      mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
        server.close();
      });
    } catch (error) {
      console.log(error);
    }
  };
  
initializeConnections();