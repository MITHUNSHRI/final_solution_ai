const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all customers
router.get('/', (req, res) => {
    try {
        const customers = db.prepare('SELECT * FROM customers ORDER BY matchScore DESC').all();
        res.json(customers);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Failed to fetch customers.' });
    }
});

// GET single customer by ID
router.get('/:id', (req, res) => {
    try {
        const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found.' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customer.' });
    }
});

// POST create a new customer
router.post('/', (req, res) => {
    const { name, email, company, role, industry, matchScore } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    try {
        const result = db.prepare(
            'INSERT INTO customers (name, email, company, role, industry, matchScore) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(name, email, company || '', role || '', industry || '', matchScore || 0);

        const newCustomer = db.prepare('SELECT * FROM customers WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(newCustomer);
    } catch (err) {
        if (err.message.includes('UNIQUE constraint')) {
            return res.status(409).json({ error: 'A customer with this email already exists.' });
        }
        console.error('Error creating customer:', err);
        res.status(500).json({ error: 'Failed to create customer.' });
    }
});

// PUT update an existing customer
router.put('/:id', (req, res) => {
    const { name, email, company, role, industry, matchScore } = req.body;
    try {
        const updated = db.prepare(
            `UPDATE customers SET
                name = COALESCE(?, name),
                email = COALESCE(?, email),
                company = COALESCE(?, company),
                role = COALESCE(?, role),
                industry = COALESCE(?, industry),
                matchScore = COALESCE(?, matchScore),
                updatedAt = datetime('now')
             WHERE id = ?`
        ).run(name, email, company, role, industry, matchScore, req.params.id);

        if (updated.changes === 0) return res.status(404).json({ error: 'Customer not found.' });

        const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
        res.json(customer);
    } catch (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({ error: 'Failed to update customer.' });
    }
});

// DELETE a customer
router.delete('/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Customer not found.' });
        res.json({ success: true, message: 'Customer deleted.' });
    } catch (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ error: 'Failed to delete customer.' });
    }
});

module.exports = router;
