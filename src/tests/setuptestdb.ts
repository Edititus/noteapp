import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

type MongooseOpts = ConnectOptions & {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  };

const mongoServer = new MongoMemoryServer(); 

let mongo: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
    const mongooseOpts:MongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  await mongoose.connect(uri, mongooseOpts) 
};

export const dropDB = async (): Promise<void> => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollections = async (): Promise<void> => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
};
