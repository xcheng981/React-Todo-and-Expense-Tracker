import './EditExpense.css';

const EditExpense = ({ editingExpense, setEditingExpense, handleUpdateExpense, handleCancelEdit, categories }) => {
    const handleChangeEditingField = (field, value) => {
        setEditingExpense({ ...editingExpense, [field]: value });
    };

    // Initialize an array to store the category options
    const categoryOptions = [];

    // Loop through categories and create option elements
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        categoryOptions.push(
            <option key={category.id} value={category.id}>{category.name}</option>
        );
    }

    return (
        <div className="edit-expense-container">
            <h3 className="edit-expense-title">Edit Expense</h3>
            <div className="form-group">
                <label>Date:</label>
                <input
                    className="form-control"
                    type="date"
                    value={editingExpense.date}
                    onChange={(e) => handleChangeEditingField('date', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <select
                    className="form-control"
                    value={editingExpense.category}
                    onChange={(e) => handleChangeEditingField('category', e.target.value)}
                >
                    <option value="" disabled>Please select</option>
                    {categoryOptions}
                </select>
                {editingExpense.category === 'other' && (
                    <input
                        className="form-control"
                        type="text"
                        value={editingExpense.customCategory}
                        onChange={(e) => handleChangeEditingField('customCategory', e.target.value)}
                        placeholder="Custom Category"
                    />
                )}
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    className="form-control"
                    type="number"
                    value={editingExpense.amount}
                    onChange={(e) => handleChangeEditingField('amount', e.target.value)}
                />
            </div>
            <div className="edit-expense-actions">
                <button className="btn btn-update" onClick={handleUpdateExpense}>Update Expense</button>
                <button className="btn btn-cancel" onClick={handleCancelEdit}>Cancel</button>
            </div>
        </div>
    );
};

export default EditExpense;
