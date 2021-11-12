import { Query } from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Todo } from "../../../models/todo";
import { ITodo } from "../../../types/todo";
import { connect } from "../../../utils/connection";

export const config = {
    api: {
        externalResolver: true,
    },
}

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const id = req.query.id as string;

    const {
        method
    } = req;

    switch (method) {
        case "GET": retrieveTodoById(id, req, res);
            break;
        case "PUT": updateTodoById(id, req, res);
            break;
        case "DELETE": deleteTodoById(id, req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
}

export default handler;

const retrieveTodoById
    = async (id: string, req: NextApiRequest, res: NextApiResponse<any>)
        : Promise<void> => {

        await connect();
        await Todo.findById(id)
            .then((todo: ITodo | null) => {
                if (todo === null) {
                    res.status(404).end();
                } else {
                    res.status(200).json(todo);
                }
            })
            .catch(error => res.status(500).json(error));
    }

const updateTodoById
    = async (id: string, req: NextApiRequest, res: NextApiResponse<any>)
        : Promise<void> => {
        const {
            body
        } = req;

        await connect();
        await Todo.findByIdAndUpdate(id, body)
            .then(() => res.status(204).end())
            .catch(error => res.status(500).json(error));
    }

const deleteTodoById
    = async (id: string, req: NextApiRequest, res: NextApiResponse<any>)
        : Promise<void> => {

        await connect();
        await Todo.findByIdAndDelete(id)
            .then(() => res.status(204).end())
            .catch(error => res.status(500).end());
    }
