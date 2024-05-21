## React Todo and Expense Tracker

This project is a React application that provides a user authentication system, todo list management, and expense tracking functionality. It uses React hooks and local storage to manage the application state and persist user data. Users can log in to their account, manage their todos and expenses, and log out when they're done.

### Features:

- User authentication (login, logout)
- Todo list management (add, delete, edit todos)
- Expense tracking (add, delete, edit expenses)
- Data persistence using local storage


### Getting Started:

1. Clone this repository:
2. Install dependencies: npm install
3. Start the Server: npm start
The application will be running at http://localhost:3000.


### Usage:

1. **Login:** On the login page, enter your username and click the login button to log in to your account. "Dog" is not allowed to login.
2. **Home Page:** After successful login, you will be redirected to the Home page. From the Home page, you can navigate to the Todo page or the Finance page using the provided buttons.
3. **Todo Page:** On the Todo page, add new todos, delete existing todos, and edit todos. You can click the "Go Back" button to return to the Home page, or click the "Log Out" button to log out and return to the Login Page.
4. **Finance Page:** On the Finance page, you can add new expenses, delete existing expenses, and edit expenses. You can click the "Go Back" button to return to the Home page, or click the "Log Out" button to log out and return to the Login Page.

### Note:

User data, including todos and expenses, is stored in the browser's local storage and will persist across page reloads and application restarts.

### Technologies Used:

- React
- React Hooks (useState, useEffect)
- Local Storage

### License:

This project is licensed under the MIT License.
