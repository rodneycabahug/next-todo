import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

let cachedConn: typeof mongoose;

export const connect = async (): Promise<typeof mongoose> => {
    if (cachedConn) {
        console.log("Cached connection exists. Returning cached connection.");
        return cachedConn;
    }

    console.log("Creating new connection.");
    cachedConn = await mongoose
        .connect(MONGODB_URI as string)
        .catch(error => {
            console.log(error);
            throw error;
        });


    return cachedConn;
}