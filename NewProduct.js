import React, { useState } from 'react';

const NewProduct = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price || !imageUrl) {
            alert('All fields are required');
            return;
        }
        if (isNaN(price) || parseFloat(price) <= 0) {
            alert('Price must be a positive number');
            return;
        }
        if (!imageUrl.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/)) {
            alert('Please enter a valid image URL (e.g., ending with .jpg, .png)');
            return;
        }
        onAddProduct({ name, price: parseFloat(price), imageUrl });
        alert('Product added successfully!');
        setName('');
        setPrice('');
        setImageUrl('');
    };

    return (
        <div className="new-product-form">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="url"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default NewProduct;
