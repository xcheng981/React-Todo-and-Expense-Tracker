import { useState, useEffect } from 'react';
import Utils from '../Utils';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import './TodoPage.css';

const TodoPage = ({ onLogout, onGoBack }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ date: '', content: '' });
    const [editIndex, setEditIndex] = useState(null);
    const currentUser = JSON.parse(sessionStorage.getItem('userData'));
    const username = currentUser ? currentUser.username : null;
    const Logout = () => {
        setTodos([])
        onLogout('')
    }
    useEffect(() => {
        if (username) {
            const storedTodos = sessionStorage.getItem(`todos-${username}`);
            const data = storedTodos ? JSON.parse(storedTodos) : [];
            const updatedTodos = [...data];
            setTodos(updatedTodos);
        }
    }, []);

    const handleAddTodo = () => {
        const updatedTodos = [...todos, newTodo];
        sessionStorage.setItem(`todos-${username}`, JSON.stringify(updatedTodos))
        setTodos(updatedTodos);
        setNewTodo({ date: '', content: '' });
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
    };

    const handleUpdateTodo = (index, field, value) => {
        // Initialize an array to store updated todos
        const updatedTodos = [];
        // Loop through todos array and update the specified todo
        for (let i = 0; i < todos.length; i++) {
            const todo = todos[i];

            // Check if the current index matches the specified index
            if (i === index) {
                // Create a new todo object with the updated field value
                const updatedTodo = { ...todo, [field]: value };
                // Add the updated todo to the updatedTodos array
                updatedTodos.push(updatedTodo);
            } else {
                // If the index doesn't match, add the todo without changes
                updatedTodos.push(todo);
            }
        }
        setTodos(updatedTodos);
        sessionStorage.setItem(`todos-${username}`, JSON.stringify(updatedTodos))
        setEditIndex(null);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
    };

    return (
        <div className="todo-page-container">
            <Utils onLogout={Logout} onGoBack={onGoBack} />
            <div className="todo-page-header">
                <h2 className="todo-page-title">Todo Page</h2>
            </div>
            <div className="todo-page-content">
                <div className="todo-form">
                    <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleAddTodo={handleAddTodo} />
                </div>
                <div className="todo-list">
                    <TodoList
                        todos={todos}
                        editIndex={editIndex}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleUpdateTodo={handleUpdateTodo}
                        handleCancelEdit={handleCancelEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoPage;