const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'negotech_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

app.post('/contact', (req, res) => {
    let contact = { name: req.body.name, email: req.body.email, subject: req.body.subject, message: req.body.message };
    let sql = 'INSERT INTO contacts SET ?';
    db.query(sql, contact, (err, result) => {
        if (err) throw err;
        res.send('Contact information saved...');
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
