import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

const client = new MongoClient(uri);

export const mongoClient = client;
export const db = client.db("booknest");