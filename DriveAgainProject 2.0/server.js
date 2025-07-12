const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',      // Your MySQL host (usually 'localhost')
  user: 'root',           // Your MySQL username (default is 'root')
  password: '',           // Your MySQL password (default is empty or 'root')
  database: 'contact_form' // Your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// API Endpoint to Handle Form Submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error submitting message');
    }
    res.status(200).send('Message submitted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});