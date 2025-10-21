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

app.get('/api/mahasiswa', (req, res) => {
    db.query( 'SELECT * FROM biodata', (err, results) => {
        if (err) {
            console.error('Error executing query:', + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({ error: "Nama, Alamat, dan agama harus diisi!" });
    }

    db.query(
        "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)",
        [nama, alamat, agama],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database Error" });
            }
            res.status(201).json({ message: "User Created Successfully"});
        }
    );
});


app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, alamat, agama } = req.body;
    db.query(
        "UPDATE biodata set nama = ?, alamat = ?, agama = ? WHERE id = ?",
        [nama, alamat, agama, userId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database Error" });
            }
            res.json({ message: "User Update Successfully"});
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM biodata WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database Error" });
        }
        res.json({ message: "User Deleted Successfully" });
    });
});


