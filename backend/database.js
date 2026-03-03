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
        { name: 'Alice Smith', email: 'alice@techcorp.com', company: 'TechCorp', role: 'CEO', industry: 'Software', matchScore: 92 },
        { name: 'Bob Johnson', email: 'bjohnson@innovate.net', company: 'Innovate LLC', role: 'CMO', industry: 'Marketing', matchScore: 78 },
        { name: 'Charlie Brown', email: 'cbrown@buildit.org', company: 'BuildIt', role: 'VP of Ops', industry: 'Construction', matchScore: 81 },
        { name: 'Diana Prince', email: 'diana@amazonian.co', company: 'Amazonian Ltd', role: 'Director of Sales', industry: 'Retail', matchScore: 95 },
        { name: 'Evan Davis', email: 'evan@finbank.com', company: 'FinBank', role: 'CFO', industry: 'Finance', matchScore: 88 },
        { name: 'Fiona Gallagher', email: 'f.gallagher@healthplus.org', company: 'HealthPlus', role: 'Head of Product', industry: 'Healthcare', matchScore: 84 },
        { name: 'George Miller', email: 'george@autofirst.com', company: 'AutoFirst', role: 'Lead Dev', industry: 'Automotive', matchScore: 76 },
        { name: 'Hannah Abbott', email: 'hannah@eduworld.edu', company: 'EduWorld', role: 'Dean', industry: 'Education', matchScore: 72 },
        { name: 'Ian Wright', email: 'iwright@greentec.com', company: 'GreenTec', role: 'Sustainability Officer', industry: 'Energy', matchScore: 80 },
        { name: 'Julia Roberts', email: 'julia@studiocity.com', company: 'Studio City', role: 'Producer', industry: 'Entertainment', matchScore: 68 },
        { name: 'Kevin Hart', email: 'kevin@comedycentral.net', company: 'Comedy Central', role: 'Content Strategist', industry: 'Media', matchScore: 75 },
        { name: 'Laura Palmer', email: 'laura@twinpeaks.com', company: 'Twin Peaks', role: 'HR Manager', industry: 'Hospitality', matchScore: 70 },
        { name: 'Maximus Decimus', email: 'max@gladiators.io', company: 'Gladiators Tech', role: 'Security Architect', industry: 'Cybersecurity', matchScore: 91 },
        { name: 'Nina Simone', email: 'nina@musicnotes.org', company: 'Music Notes', role: 'Art Director', industry: 'Music', matchScore: 65 },
        { name: 'Oliver Twist', email: 'oliver@orphanage.net', company: 'The Orphanage', role: 'Customer Success', industry: 'Non-profit', matchScore: 74 },
        { name: 'Penelope Cruz', email: 'penelope@fashionista.com', company: 'Fashionista', role: 'Lead Designer', industry: 'Fashion', matchScore: 83 },
        { name: 'Quentin Tarantino', email: 'qt@directorscut.mov', company: 'Directors Cut', role: 'CEO', industry: 'Film', matchScore: 86 },
        { name: 'Rachel Green', email: 'rachel@ralphlauren.com', company: 'Ralph Lauren', role: 'Merchandising Manager', industry: 'Retail', matchScore: 82 },
        { name: 'Steve Rogers', email: 's.rogers@shield.gov', company: 'SHIELD', role: 'Operations Commander', industry: 'Government', matchScore: 96 },
        { name: 'Tony Stark', email: 'tony@starkindustries.com', company: 'Stark Industries', role: 'CEO', industry: 'Technology', matchScore: 99 },
        { name: 'Ursula K', email: 'ursula@earthsea.books', company: 'Earthsea', role: 'Editor in Chief', industry: 'Publishing', matchScore: 77 },
        { name: 'Victor Von Doom', email: 'victor@latveria.gov', company: 'Latveria Corp', role: 'Dictator', industry: 'Public Sector', matchScore: 60 },
        { name: 'Wanda Maximoff', email: 'wanda@magic.net', company: 'Magic Net', role: 'Data Scientist', industry: 'IT', matchScore: 89 },
        { name: 'Xavier Charles', email: 'charles@mutants.edu', company: 'X-School', role: 'Principal', industry: 'Education', matchScore: 90 },
        { name: 'Yoda Master', email: 'yoda@jedi.org', company: 'Jedi Order', role: 'Grand Master', industry: 'Defense', matchScore: 97 },
    ];

    for (const lead of initialLeads) {
        insert.run(lead);
    }
    console.log('Database seeded with initial customer data.');
}

// Database connection log
console.log(`SQLite database connected: ${DB_PATH}`);

module.exports = db;
