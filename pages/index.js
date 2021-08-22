import Head from 'next/head';
import Navbar from '../components/Navbar';
import { table, minifyRecords } from './api/utils/airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../context/TodosContext';
import { useContext, useEffect } from 'react';
import auth0 from './api/utils/auth0';
import TodoForm from '../components/TodoForm';
import Link from 'next/link';

export default function Home({ initialTodos, user }) {
	const { todos, setTodos } = useContext(TodosContext);
	useEffect(() => {
		setTodos(initialTodos);
	}, []);

	return (
		<div>
			<Head>
				<title>Authenticated TODO App</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
				/>
			</Head>
			<Navbar user={user} />
			<main>
				{user && (
					<>
						<h1 className="text-2xl font-bold mb-4 text-center">
							My Todo List
						</h1>
						<TodoForm />
						<ul>
							{todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
						</ul>
					</>
				)}
				<h1 className="text-xl">Please login to use the app</h1>
			</main>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const session = await auth0.getSession(ctx.req);
	let todos = [];
	if (session?.user) {
		todos = await table
			.select({
				filterByFormula: `userId = '${session.user.sub}'`,
			})
			.firstPage();
	}
	return {
		props: {
			initialTodos: minifyRecords(todos),
			user: session?.user || null,
		},
	};
}
