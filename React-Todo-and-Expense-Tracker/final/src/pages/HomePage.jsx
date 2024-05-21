import { useEffect } from 'react';
import './HomePage.css';

const HomePage = ({ onLogout, onTodoClick, onFinanceClick, storedContent, setStoredContent }) => {
    useEffect(() => {
        const storedContent = sessionStorage.getItem('content');
        if (storedContent) {
            setStoredContent(JSON.parse(storedContent));
        } else {
            setStoredContent(null);
        }
    }, [setStoredContent]);

    useEffect(() => {
        if (storedContent) {
            sessionStorage.setItem('content', JSON.stringify(storedContent));
        }
    }, [storedContent]);

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to TaskTracker & ExpenseManager</h1>
            <h2 className="home-page">Home Page</h2>
            <div className="home-buttons">
                <button onClick={onTodoClick}>Todo</button>
                <button onClick={onFinanceClick}>Finance</button>
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HomePage;