import Link from "next/link";
import { ITodo } from "../types/todo";
import { GetServerSideProps } from "next";
import styles from "../styles/Index.module.css";

interface IndexProps {
  todos: ITodo[]
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res: Response = await fetch(`${process.env.API_URL}/todos`);
  const todos: ITodo[] = await res.json();
  return {
    props: { todos }
  }
}

const Index = (props: IndexProps): JSX.Element => {

  return (
    <div className={styles.container}>
      <h1>My Todo List</h1>
      <h2>Click on the Todo to see the details.</h2>
      <Link href="/todos/create" passHref><button>Create a New Todo</button></Link>
      {props.todos.map(t => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`} passHref>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Index;