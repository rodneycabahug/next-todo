import { ITodo } from "../../types/todo";
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from "next/router";
import { useState } from "react";


interface ShowProps {
    todo: ITodo
    url: string
};

export const getServerSideProps: GetServerSideProps
    = async (context: GetServerSidePropsContext) => {
        const res: Response = await fetch(`${process.env.API_URL}/todos/${context.query.id}`);
        const todo: ITodo = await res.json();
        return {
            props: {
                todo: todo,
                url: `${process.env.API_URL}/todos/${todo._id}`
            }
        };
    }

const Show = (props: ShowProps): JSX.Element => {
    const router = useRouter();

    const [todo, setTodo] = useState<ITodo>(props.todo);

    const handleComplete = async (): Promise<void> => {
        if (todo.completed) {
            return;
        }

        let updatedTodo = { ...todo, completed: true } as ITodo;
        await fetch(
            props.url,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)
            }
        );
        setTodo(updatedTodo);
    }

    const handleDelete = async (): Promise<void> => {
        await fetch(
            props.url,
            { method: "delete" }
        );
        router.push("/");
    }

    const handleGoBack = async (): Promise<void> => {
        router.push("/");
    }

    return (
        <div>
            <h1>{todo.item}</h1>
            <h2>{todo.completed ? "completed" : "incomplete"}</h2>
            <button onClick={handleComplete}>Complete</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleGoBack}>Go back</button>
        </div>
    );
}

export default Show;