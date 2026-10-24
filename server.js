const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'citas.json');

function leerCitas() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function guardarCitas(citas) {
  fs.writeFileSync(DB_PATH, JSON.stringify(citas, null, 2));
}

app.get('/citas', (req, res) => {
  const citas = leerCitas();
  res.json(citas);
});

app.post('/citas', (req, res) => {
  const citas = leerCitas();
  const nuevaCita = {
    id: citas.length > 0 ? citas[citas.length - 1].id + 1 : 1,
    ...req.body
  };
  citas.push(nuevaCita);
  guardarCitas(citas);
  res.status(201).json(nuevaCita);
});

app.listen(3000, () => {
  console.log('Backend real corriendo en http://localhost:3000');
});