import { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ newTodo, setNewTodo, handleAddTodo }) => {
    const [error, setError] = useState({ content: false, date: false });

    const handleAdd = () => {
        const contentError = !newTodo.content.trim();
        const dateError = !newTodo.date.trim();

        setError({ content: contentError, date: dateError });

        if (contentError || dateError) {
            return;
        }

        handleAddTodo();
    };

    return (
        <div className="todo-form-container">
            <div className="todo-form-row">
                <label className="todo-form-label">Date:</label>
                <input
                    className={`todo-form-input ${error.date ? 'todo-form-input-error' : ''}`}
                    type="date"
                    value={newTodo.date}
                    onChange={(e) => {
                        setError({ ...error, date: false });
                        setNewTodo({ ...newTodo, date: e.target.value });
                    }}
                />
                {error.date && <div className="todo-form-error">Date cannot be empty.</div>}
            </div>
            <div className="todo-form-row">
                <input
                    className={`todo-form-input todo-form-content ${error.content ? 'todo-form-input-error' : ''}`}
                    type="text"
                    placeholder="Content"
                    value={newTodo.content}
                    onChange={(e) => {
                        setError({ ...error, content: false });
                        setNewTodo({ ...newTodo, content: e.target.value });
                    }}
                />
                {error.content && <div className="todo-form-error">Content cannot be empty.</div>}
            </div>
            <div className="todo-form-row">
                <button className="todo-form-button" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default TodoForm;