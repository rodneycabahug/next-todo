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
    const {
        method
    } = req;

    switch (method) {
        case "GET": retrieveAllTodos(req, res);
            break;
        case "POST": createTodos(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
}

export default handler;

const retrieveAllTodos = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await connect();
    await Todo.find({})
        .then((todos: ITodo[]) => {
            res.status(200).json(todos);
        })
        .catch(error => res.status(500).json(error));

}

const createTodos = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
    const newTodo = req.body as ITodo;

    await connect();
    await Todo.create(newTodo)
        .then((addedTodo: ITodo) => {
            console.log(`Successfully added todo. Id: ${addedTodo._id}`);
            res.status(200).json(addedTodo);
        })
        .catch(error => res.status(500).json(error));
}
