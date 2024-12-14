import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ setPage }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Here you would normally handle the order placement logic
        // For now, we'll simulate this with an alert and set orderPlaced to true
        setOrderPlaced(true);
        
        setTimeout(() => {
            setOrderPlaced(false);
            setPage('home'); // Redirect back to the home page after 2 seconds
        }, 10000); // Remove the alert after 2 seconds
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            
            {orderPlaced && (
                <div className="order-alert">
                    <p>Order will be shipped soon!</p>
                </div>
            )}

            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="payment">Payment Method:</label>
                    <select id="payment" name="payment" required>
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash-on-delivery">Cash on Delivery</option>
                    </select>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
