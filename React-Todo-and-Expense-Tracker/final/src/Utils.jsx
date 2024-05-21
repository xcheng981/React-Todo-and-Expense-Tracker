import './Utils.css';

const Utils = ({ onLogout, onGoBack }) => {
    return (
        <div className="utils-container">
            <button className="btn btn-go-back" onClick={onGoBack}>Go Back</button>
            <button className="btn btn-logout" onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Utils;