const Database = require('better-sqlite3');
const path = require('path');

// The database file will be stored inside the server/ directory
const DB_PATH = path.join(__dirname, 'aura_sales.db');

const db = new Database(DB_PATH);

// Create the customers table if it doesn't already exist
db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        company TEXT,
        role TEXT,
        industry TEXT,
        matchScore INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT DEFAULT (datetime('now'))
    )
`);

// Seed initial data only if the table is empty
const existing = db.prepare('SELECT COUNT(*) as count FROM customers').get();
if (existing.count === 0) {
    const insert = db.prepare(`
        INSERT INTO customers (name, email, company, role, industry, matchScore)
        VALUES (@name, @email, @company, @role, @industry, @matchScore)
    `);

    const initialLeads = [
        { name: 'Sarah Jenkins', email: 'sarah.j@globaltech.com', company: 'GlobalTech Solutions', role: 'CTO', industry: 'SaaS', matchScore: 98 },
        { name: 'David Chen', email: 'david.chen@finsecure.io', company: 'FinSecure Inc', role: 'VP Engineering', industry: 'FinTech', matchScore: 94 },
        { name: 'Elena Rodriguez', email: 'elena@medidata.net', company: 'Medidata Systems', role: 'Chief Data Officer', industry: 'Healthcare', matchScore: 89 },
        { name: "Michael O'Brien", email: 'mike@nextgenretail.com', company: 'NextGen Retail', role: 'Director of Ops', industry: 'E-commerce', matchScore: 87 },
        { name: 'James Wilson', email: 'j.wilson@swiftlogistics.com', company: 'Swift Logistics', role: 'Head of IT', industry: 'Logistics', matchScore: 85 },
    ];

    for (const lead of initialLeads) {
        insert.run(lead);
    }
    console.log('Database seeded with initial customer data.');
}

console.log(`SQLite database connected: ${DB_PATH}`);

module.exports = db;
