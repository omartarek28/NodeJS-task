import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const db = 'todoApp';

const client = new MongoClient(url);

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
        process.exit(1);
    }
};

export const getDb = () => {
    return client.db(db);
};