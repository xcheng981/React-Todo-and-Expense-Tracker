import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import FinancePage from './pages/FinancePage';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [storedContent, setStoredContent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem('loggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
      setCurrentPage('home');
    }

    const storedContent = sessionStorage.getItem('content');
    if (storedContent) {
      setStoredContent(JSON.parse(storedContent));
    }

    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (userInfo) => {
    setLoggedIn(true);
    setCurrentUser({ username: userInfo, });
    setCurrentPage('home');
    sessionStorage.setItem('userData', JSON.stringify({ username: userInfo, }));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleTodoClick = () => {
    setCurrentPage('todo');
  };

  const handleFinanceClick = () => {
    setCurrentPage('finance');
  };

  const handleGoBack = () => {
    setCurrentPage('home');
  };

  return (
    <div className="app">
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'home' && (
        <HomePage
          onLogout={handleLogout}
          onTodoClick={handleTodoClick}
          onFinanceClick={handleFinanceClick}
          storedContent={storedContent}
          setStoredContent={setStoredContent}
        />
      )}
      {currentPage === 'todo' && (
        <TodoPage
          onLogout={handleLogout}
          onGoBack={handleGoBack}
          currentUser={currentUser}
        />
      )}
      {currentPage === 'finance' && (
        <FinancePage
          onLogout={handleLogout}
          onGoBack={handleGoBack}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default App;