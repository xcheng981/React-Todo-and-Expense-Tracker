const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let sessions = {};

app.use(express.static('./dist'));
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const { username } = req.body;

    if (!username.trim()) {
        res.status(400).json({ error: 'Please input username' });
        return;
    }

    if (username.trim() === 'dog') {
        res.status(403).json({ error: 'Dog is not allowed' });
        return;
    }

    sessions[username] = { username };
    req.session.loggedIn = true;
    req.session.username = username;

    res.status(200).json({ message: 'Successfully logged in', sessionId: username });
});

app.get('/api/checkLogin', (req, res) => {
    const sessionId = req.session.username;
    if (sessions[sessionId]) {
        res.json({ loggedIn: true, user: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/logout', (req, res) => {
    const username = req.session.username;
    delete sessions[username];

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Successfully logged out' });
        }
    });
});

app.post('/api/todos', (req, res) => {
    const { todo } = req.body;
    const username = req.session.username;
    if (!todos[username]) {
        todos[username] = [];
    }
    todos[username].push(todo);
    res.status(201).json({ message: 'Todo added', todos: todos[username] });
});

app.delete('/api/todos/:todoId', (req, res) => {
    const { todoId } = req.params;
    const username = req.session.username;

    if (todos[username]) {
        const index = todos[username].findIndex(item => item.id === todoId);
        if (index !== -1) {
            todos[username].splice(index, 1);
            res.status(200).json({ message: 'Todo deleted' });
            return;
        }
    }
    res.status(404).json({ error: 'Todo not found' });
});

app.post('/api/expenses', (req, res) => {
    const { expense } = req.body;
    const username = req.session.username;
    if (!expenses[username]) {
        expenses[username] = [];
    }
    expenses[username].push(expense);
    res.status(201).json({ message: 'Expense added', expenses: expenses[username] });
});

app.delete('/api/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const username = req.session.username;

    if (expenses[username]) {
        const index = expenses[username].findIndex(item => item.id === expenseId);
        if (index !== -1) {
            expenses[username].splice(index, 1);
            res.status(200).json({ message: 'Expense deleted' });
            return;
        }
    }
    res.status(404).json({ error: 'Expense not found' });
});

const restoreSession = (req, res, next) => {
    const sessionId = req.headers.authorization;
    if (sessionId && sessions[sessionId]) {
        req.user = sessions[sessionId];
    }
    next();
};

app.use(restoreSession);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
