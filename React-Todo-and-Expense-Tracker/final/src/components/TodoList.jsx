import { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = ({ todos, editIndex, handleEditTodo, handleDeleteTodo, handleUpdateTodo, handleCancelEdit }) => {
    const [tempTodo, setTempTodo] = useState({ date: '', content: '' });

    useEffect(() => {
        if (editIndex !== null) {
            // If in edit mode, set the tempTodo to the current todo's data
            setTempTodo({
                date: todos[editIndex].date,
                content: todos[editIndex].content
            });
        }
    }, [editIndex, todos]);

    const handleTempChange = (field, value) => {
        setTempTodo({ ...tempTodo, [field]: value });
    };

    const handleConfirmEdit = () => {
        handleUpdateTodo(editIndex, 'date', tempTodo.date);
        handleUpdateTodo(editIndex, 'content', tempTodo.content);
        setTempTodo({ date: '', content: '' });
    };

    const handleCancelEditLocal = () => {
        setTempTodo({ date: '', content: '' });
        handleCancelEdit();
    };

    const todoItems = [];
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (editIndex === i) {
            todoItems.push(
                <li key={i} className="todo-item">
                    <input
                        className="todo-item-input"
                        type="date"
                        value={tempTodo.date}
                        onChange={(e) => handleTempChange('date', e.target.value)}
                    />
                    <input
                        className="todo-item-input todo-item-content"
                        type="text"
                        value={tempTodo.content}
                        onChange={(e) => handleTempChange('content', e.target.value)}
                    />
                    <div className="edit-buttons">
                        <button onClick={handleConfirmEdit}>Update</button>
                        <button onClick={handleCancelEditLocal}>Cancel</button>
                    </div>
                </li>
            );
        } else {
            todoItems.push(
                <li key={i} className="todo-item">
                    <span>{todo.date}</span>
                    <span>{todo.content}</span>
                    <div className="edit-buttons">
                        <button onClick={() => handleEditTodo(i)}>Edit</button>
                        <button onClick={() => handleDeleteTodo(i)}>Delete</button>
                    </div>
                </li>
            );
        }
    }

    return (
        <ul className="todo-list">
            {todoItems}
        </ul>
    );
};

export default TodoList;
