// npm init -y
// npm install express body-parser cors

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/usuarios', (req, res) => {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/usuarios', (req, res) => {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo.');
        }

        const usuarios = JSON.parse(data);
        usuarios.push(req.body);

        fs.writeFile('usuarios.json', JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el archivo.');
            }
            res.status(201).send(req.body);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
