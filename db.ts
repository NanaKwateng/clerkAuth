import mongoose, { Mongoose } from 'mongoose';

const MONGO_URL = process.env.MONGO_URL! 

interface MongooseConn {
    conn: Mongoose | null; // This can remain as is
    promise: Promise<Mongoose> | null; // This can also remain as is
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

// Example usage
let cached: MongooseConn = global.mongoose || { conn: null, promise: null }

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
    if(cached.conn) return cached.conn;

    cached.promise = cached.promise || mongoose.connect(MONGO_URL, {
        dbName: 'clerkAuth',
        bufferCommands: false,
        connectTimeoutMS: 30000,
    })

    cached.conn = await cached.promise;
    return cached.conn;
}

//mongodb connection
//Cqzy49V6YNOQq0S4 userName is nanakwateng172 