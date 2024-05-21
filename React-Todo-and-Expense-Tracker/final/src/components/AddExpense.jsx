import { useState } from 'react';
import './AddExpense.css';

const AddExpense = ({ categories, newExpense, setNewExpense, handleAddExpense, customCategory, handleCustomCategoryChange, handleCategoryChange }) => {
    const categoryOptions = [];

    const [errors, setErrors] = useState({ date: false, category: false, amount: false });
    const [errorMessage, setErrorMessage] = useState('');

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        categoryOptions.push(
            <option key={category.id} value={category.id}>{category.name}</option>
        );
    }

    const validateForm = () => {
        const newErrors = {
            date: !newExpense.date,
            category: !newExpense.category || newExpense.category === "",
            amount: !newExpense.amount
        };
        const errorMessages = [];
        if (newErrors.date) {
            errorMessages[0] = "Date cannot be empty."
        } else {
            errorMessages[0] = ''
        };
        if (newErrors.category) {
            errorMessages[1] = "Please select a category."
        } else {
            errorMessages[1] = ''
        };
        if (newErrors.amount) {
            errorMessages[2] = "Amount cannot be empty."
        } else {
            errorMessages[2] = ''
        };

        setErrors(newErrors);
        setErrorMessage(errorMessages.join(" "));
        return errorMessages.every((t) => !t);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setErrorMessage('');
            handleAddExpense();
        }
    };

    return (
        <div className="add-expense-container">
            <h3 className="add-expense-title">Add Expense</h3>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        className="form-control"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        className="form-control"
                        value={newExpense.category}
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled>Please select</option>
                        {categoryOptions}
                    </select>
                    {newExpense.category === 'other' && (
                        <input
                            className="form-control custom-category-input"
                            type="text"
                            value={customCategory}
                            onChange={handleCustomCategoryChange}
                            placeholder="Optional custom category"
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input
                        className="form-control"
                        type="number"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                </div>
                <button className="btn add-expense-btn" onClick={handleSubmit}>Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
