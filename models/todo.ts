import mongoose, { model, Schema } from "mongoose";
import { ITodo } from "../types/todo";

const TodoSchema: Schema = new Schema(
    {
        item: {
            type: String,
            required: true
        },

        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);

export const Todo = mongoose.models.Todo || model<ITodo>("Todo", TodoSchema);