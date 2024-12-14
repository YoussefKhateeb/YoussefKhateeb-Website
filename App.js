import React, { useState } from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import CheckoutPage from './CheckoutPage';
import NewProduct from './NewProduct';

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setPage={setCurrentPage} />;
            case 'login':
                return <LoginPage setPage={setCurrentPage} />;
            case 'signup':
                return <SignUpPage setPage={setCurrentPage} />;
            case 'checkout':
                return <CheckoutPage setPage={setCurrentPage} />;
            case 'newProduct':
                return <NewProduct setPage={setCurrentPage} />;
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <div>
            {}
            {renderPage()}
        </div>
    );
}

export default App;
