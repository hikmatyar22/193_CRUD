const express = require("express");
let mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded( { extendede: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3309',
    password: 'Desember221204',
    database: 'mahasiswa'
});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to the Database:' + err.stack);
        return;
    }
    console.log('Koneksi Berhasil');
})

