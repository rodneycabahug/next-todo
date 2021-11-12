import { Document } from "mongoose";

export interface ITodo extends Document {
    item: string,
    completed: boolean
}