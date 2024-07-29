import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_TODOS } from '../graphql/queries/todoQueries';
import { Todo } from '../interfaces/interfaces';
import './Todos.css'; // Import CSS for styling

const Todos: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery<{ user: { todos: Todo[] } }>(GET_USER_TODOS, {
    variables: { userId },
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (data && data.user) {
      setTodos(data.user.todos);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleCreateTodo = () => {
    const title = prompt("Enter todo title:");
    if (title) {
      const newTodo = {
        id: String(todos.length + 1), // Simple ID generation
        title,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  return (
    <div>
      <button onClick={handleCreateTodo}>Add Todo</button>
      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}
          >
            <h3>{todo.title}</h3>
            <p>{todo.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
