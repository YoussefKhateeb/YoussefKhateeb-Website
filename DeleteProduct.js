import React from 'react';

const DeleteProduct = ({ productId, onDeleteProduct }) => {
    const handleDelete = async () => {
        // Check if the user is an admin
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('You must be logged in to delete a product.');
            return;
        }

        try {
            // Validate token
            const response = await fetch('http://localhost:5001/api/users/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                alert('Invalid token. Please log in again.');
                return;
            }

            // Confirm delete action
            if (window.confirm('Are you sure you want to delete this product?')) {
                onDeleteProduct(productId);
            }
        } catch (err) {
            console.error('Error validating token:', err.message);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <button onClick={handleDelete} className="delete-product-button">
            Delete
        </button>
    );
};

export default DeleteProduct;
