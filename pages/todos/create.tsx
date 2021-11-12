import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useRef } from "react";
import { ITodo } from "../../types/todo";
import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

interface CreateProps {
    url: string
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext)
    : Promise<GetStaticPropsResult<CreateProps>> => {

    return {
        props: {
            url: `${process.env.API_URL}/todos`
        }
    };
}

const Create = (props: CreateProps): JSX.Element => {
    const router = useRouter();

    const item = useRef<HTMLInputElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        if (null === item.current) {
            return;
        }

        let todo: ITodo = { item: item.current.value, completed: false } as ITodo;

        await fetch(props.url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });

        router.push("/");
    }

    return (
        <div>
            <h1>Create a New Todo</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={item} />
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Create;