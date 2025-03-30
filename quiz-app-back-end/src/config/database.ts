import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');

export async function connectDB() {
  try {
    await client.connect();
    console.log('MongoDB Client Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export const db = client.db('quizApp');
