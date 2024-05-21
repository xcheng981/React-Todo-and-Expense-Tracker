import { useState, useEffect } from 'react';
import AddExpense from '../components/AddExpense';
import ExpenseHistory from '../components/ExpenseHistory';
import EditExpense from '../components/EditExpense';
import Utils from '../Utils';
import './FinancePage.css';

const FinancePage = ({ onLogout, onGoBack }) => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingExpense, setEditingExpense] = useState({ index: -1, date: '', category: '', amount: '' });
    const [displayMode, setDisplayMode] = useState('daily');
    const [categories, setCategories] = useState([
        { id: 'grocery', name: 'Grocery' },
        { id: 'clothing', name: 'Clothing' },
        { id: 'entertainment', name: 'Entertainment' },
        { id: 'transportation', name: 'Transportation' },
        { id: 'other', name: 'Other' }
    ]);
    const [customCategory, setCustomCategory] = useState('');
    const currentUser = JSON.parse(sessionStorage.getItem('userData'));
    const username = currentUser ? currentUser.username : null;
    useEffect(() => {
        const storedExpenses = sessionStorage.getItem('expenses-' + username);
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
    }, []);

    const handleAddExpense = () => {
        if (newExpense.date.trim() !== '' && newExpense.category.trim() !== '' && newExpense.amount.trim() !== '') {
            let finalCategory = newExpense.category;
            if (newExpense.category === 'other' && customCategory.trim() !== '') {
                finalCategory = `Other-${customCategory}`;
                if (!categories.some(category => category.name === finalCategory)) {
                    setCategories([...categories, { id: finalCategory.toLowerCase(), name: finalCategory }]);
                }
            }
            setExpenses([...expenses, { ...newExpense, category: finalCategory }]);
            setNewExpense({ date: '', category: '', amount: '' });
            setCustomCategory('');
            sessionStorage.setItem('expenses-' + username, JSON.stringify([...expenses, newExpense]));

        }
    };

    const handleEditExpense = (index) => {
        setIsEditing(true);
        const expense = expenses[index];
        setEditingExpense({
            index,
            date: expense.date,
            category: expense.category.startsWith('Other-') ? 'other' : expense.category,
            amount: expense.amount,
            customCategory: expense.category.startsWith('Other-') ? expense.category.substring(6) : ''
        });

    };

    const handleUpdateExpense = () => {
        const updatedExpenses = [...expenses];
        let finalCategory = editingExpense.category;
        if (editingExpense.category === 'other' && editingExpense.customCategory.trim() !== '') {
            finalCategory = `Other-${editingExpense.customCategory}`;
            if (!categories.some(category => category.name === finalCategory)) {
                setCategories([...categories, { id: finalCategory.toLowerCase(), name: finalCategory }]);
            }
        }
        updatedExpenses[editingExpense.index] = { ...editingExpense, category: finalCategory };
        setExpenses(updatedExpenses);
        sessionStorage.setItem('expenses-' + username, JSON.stringify(updatedExpenses));

        setIsEditing(false);
        setEditingExpense({ index: -1, date: '', category: '', amount: '', customCategory: '' });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingExpense({ index: -1, date: '', category: '', amount: '' });
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
        sessionStorage.setItem('expenses-' + username, JSON.stringify(updatedExpenses));
    };

    const handleChangeDisplayMode = (mode) => {
        setDisplayMode(mode);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setNewExpense({ ...newExpense, category: selectedCategory });
        if (selectedCategory === 'other') {
            setCustomCategory('');
        }
    };

    const handleCustomCategoryChange = (e) => {
        setCustomCategory(e.target.value);
    };

    return (
        <div className="finance-page-container">
            <Utils onLogout={onLogout} onGoBack={onGoBack} />
            <h2>Finance Management</h2>
            <AddExpense
                categories={categories}
                newExpense={newExpense}
                setNewExpense={setNewExpense}
                handleAddExpense={handleAddExpense}
                customCategory={customCategory}
                handleCustomCategoryChange={handleCustomCategoryChange}
                handleCategoryChange={handleCategoryChange}
            />

            <ExpenseHistory
                expenses={expenses}
                onEditExpense={handleEditExpense}
                onDeleteExpense={handleDeleteExpense}
                handleChangeDisplayMode={handleChangeDisplayMode}
                displayMode={displayMode}
            />


            {isEditing && (
                <EditExpense
                    editingExpense={editingExpense}
                    setEditingExpense={setEditingExpense}
                    handleUpdateExpense={handleUpdateExpense}
                    handleCancelEdit={handleCancelEdit}
                    categories={categories}
                />
            )}
        </div>
    );
}

export default FinancePage;