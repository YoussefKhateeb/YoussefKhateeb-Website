const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { db, createTables, runQuery, getQuery } = require('./db'); // Import your database module

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Initialize database tables
createTables();

// Fetch all users
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'An error occurred' });
        }
        res.json(rows);
    });
});

// Sign up route
app.post('/api/users/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the username already exists
        const userExists = await getQuery('SELECT * FROM users WHERE username = ?', [username]);
        if (userExists.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await runQuery('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// Login route
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getQuery('SELECT * FROM users WHERE username = ?', [username]);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await getQuery('SELECT * FROM products');
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

// Add a new product
app.post('/api/products', async (req, res) => {
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
        return res.status(400).json({ error: 'Please provide all product details' });
    }

    try {
        await runQuery('INSERT INTO products (name, price, imageUrl) VALUES (?, ?, ?)', [name, price, imageUrl]);
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        console.error('Error adding product:', err.message);
        res.status(500).json({ error: 'An error occurred while adding the product' });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await runQuery('DELETE FROM products WHERE id = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
