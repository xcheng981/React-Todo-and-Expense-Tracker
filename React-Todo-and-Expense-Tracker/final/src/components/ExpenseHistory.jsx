import './ExpenseHistory.css';

const ExpenseHistory = ({ expenses, onEditExpense, onDeleteExpense, handleChangeDisplayMode, displayMode }) => {
    const filteredExpenses = () => {
        switch (displayMode) {
            case 'daily':
                return expenses;
            case 'weekly':
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return expenses.filter(expense => new Date(expense.date) >= oneWeekAgo);
            case '30days':
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return expenses.filter(expense => new Date(expense.date) >= thirtyDaysAgo);
            case 'monthly':
                const currentDate = new Date();
                const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                return expenses.filter(expense => new Date(expense.date) >= firstDayOfMonth);
            case 'yearly':
                const currentYear = new Date().getFullYear();
                return expenses.filter(expense => new Date(expense.date).getFullYear() === currentYear);
            default:
                return expenses;
        }
    };

    // Initialize an array to store the table rows
    const expenseRows = [];

    // Loop through the filtered expenses array and create table rows
    for (let index = 0; index < filteredExpenses().length; index++) {
        const expense = filteredExpenses()[index];
        expenseRows.push(
            <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>
                    <button className="btn edit-btn" onClick={() => onEditExpense(index)}>Edit</button>
                    <button className="btn delete-btn" onClick={() => onDeleteExpense(index)}>Delete</button>
                </td>
            </tr>
        );
    }

    return (
        <div className="expense-history-container">
            <h3 className="expense-history-title">Expense History</h3>
            <select className="display-mode-select" onChange={(e) => handleChangeDisplayMode(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="30days">Last 30 Days</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <table className="expense-history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseRows}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseHistory;
