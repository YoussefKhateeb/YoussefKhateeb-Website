import React, { useState, useEffect } from 'react';
import './HomePage.css';
import NewProduct from './NewProduct';
import DeleteProduct from './DeleteProduct'; // Import the DeleteProduct component

const HomePage = ({ setPage }) => {
    const [cart, setCart] = useState({});
    const [newProducts, setNewProducts] = useState([]); // State for products
    const [view, setView] = useState('home'); // State to toggle between home and new product view

    const handleQuantityChange = (productId, change) => {
        setCart((prevCart) => {
            const newQuantity = (prevCart[productId] || 0) + change;
            if (newQuantity < 0) return prevCart; // Prevent negative quantities
            return { ...prevCart, [productId]: newQuantity };
        });
    };

    const getTotal = () => {
        return newProducts.reduce((total, product) => {
            return total + (cart[product.id] || 0) * product.price;
        }, 0);
    };

    // Function to handle adding new products
    const handleAddProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now() }; // Assign a unique ID using timestamp
        setNewProducts((prevProducts) => [...prevProducts, productWithId]);
        setView('home'); // Redirect back to the product list after adding the product
    };

    // Fetch products from the server when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const products = await response.json();
                setNewProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this effect will run once on mount

    // Render either the product list or the new product form based on the `view` state
    if (view === 'newProduct') {
        return (
            <div>
                <NewProduct onAddProduct={handleAddProduct} />
                <button
                    className="back-button"
                    onClick={() => setView('home')}
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="home-page">
            <h1 className="shop-title">Shop Our Products</h1>
            <div className="product-list">
                {newProducts.length === 0 ? (
                    <p>Loading products...</p>
                ) : (
                    newProducts.map((product) => (
                        <div key={product.id} className="product">
                            <h2>{product.name}</h2>
                            <p>Price: EGP {product.price}</p>
                            <div className="quantity-control">
                                <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                <span>{cart[product.id] || 0}</span>
                                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                            </div>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <DeleteProduct productId={product.id} setNewProducts={setNewProducts} />
                        </div>
                    ))
                )}
            </div>

            <div className="cart-summary">
                <p>Total: EGP {getTotal()}</p>
                <button onClick={() => setPage('checkout')} className="checkout-button">
                    Go to Checkout
                </button>
                <button onClick={() => setView('newProduct')} className="new-product-button">
                    Add New Product
                </button>
            </div>

            <div className="about-contact">
                <section className="about-us">
                    <h2>About Us</h2>
                    <p>
                        Welcome to EXY Wear | Where Style Meets Comfort!
                        At EXY Wear, we believe that fashion should empower and inspire confidence, while remaining effortlessly comfortable.
                        Our mission is to provide high-quality, stylish clothing that fits seamlessly into your everyday life.
                        From casual streetwear to versatile wardrobe essentials, every piece is designed with both fashion and function in mind.
                    </p>
                </section>

                <section className="contact-us">
                    <h2>Contact Us</h2>
                    <p>📧 Email: support@exywear.com</p>
                    <p>📞 Phone: 01066616933 (WhatsApp Only)</p>
                    <p>Follow us on social media: Facebook | Instagram | Twitter</p>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
