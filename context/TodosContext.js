import { createContext, useState } from 'react';
import axios from 'axios';
const TodosContext = createContext();

const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);

	const refreshTodos = async () => {
		try {
			const { data } = await axios.get('/api/getTodos');
			console.log(data);
			setTodos(data);
		} catch (err) {
			console.error(err);
		}
	};

	const addTodo = async (description) => {
		try {
			const { data } = await axios.post('/api/createTodo', {
				description,
			});
			console.log(data);
			setTodos((prevTodos) => [data, ...prevTodos]);
		} catch (err) {
			console.error(err);
		}
	};

	const updateTodo = async ({ id, fields }) => {
		try {
			const { data } = await axios.put('/api/updateTodo', {
				id,
				fields,
			});
			console.log(data);
			setTodos((prevTodos) => {
				const existingTodos = [...prevTodos];
				const existingTodo = existingTodos.find((todo) => todo.id === id);
				existingTodo.fields = fields;
				return existingTodos;
			});
		} catch (err) {
			console.error(err);
		}
	};

	const deleteTodo = async ({ id }) => {
		try {
			const { data } = await axios.delete('/api/deleteTodo', {
				data: {
					id,
				},
			});
			console.log(data);
			setTodos((prevTodos) => {
				return prevTodos.filter((todo) => todo.id !== id);
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<TodosContext.Provider
			value={{
				todos,
				setTodos,
				refreshTodos,
				updateTodo,
				deleteTodo,
				addTodo,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
};

export { TodosContext, TodosProvider };
