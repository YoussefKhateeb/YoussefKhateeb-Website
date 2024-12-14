const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables if not exist
const createTables = () => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user' -- Role column with default to 'user'
        )`,
        (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table created successfully.');
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            imageUrl TEXT NOT NULL
        )`,
        (err) => {
            if (err) {
                console.error('Error creating products table:', err.message);
            } else {
                console.log('Products table created successfully.');
            }
        }
    );
};

// Run query
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

// Get query
const getQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Delete product by id
const deleteProduct = async (id) => {
    try {
        const result = await runQuery('DELETE FROM products WHERE id = ?', [id]);
        if (result.changes === 0) {
            throw new Error('Product not found');
        }
        console.log('Product deleted successfully.');
    } catch (err) {
        console.error('Error deleting product:', err.message);
    }
};


module.exports = {
    db,
    createTables,
    runQuery,
    getQuery,
    deleteProduct,
};
