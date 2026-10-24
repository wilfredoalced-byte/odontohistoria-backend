const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Funciones auxiliares (sirven para cualquier archivo .json) ----------
function leerArchivo(nombre) {
  const ruta = path.join(__dirname, nombre);
  if (!fs.existsSync(ruta)) return [];
  return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function guardarArchivo(nombre, datos) {
  const ruta = path.join(__dirname, nombre);
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

function siguienteId(lista) {
  return lista.length > 0 ? Math.max(...lista.map(item => item.id)) + 1 : 1;
}

// ---------- CITAS (sin cambios) ----------
app.get('/citas', (req, res) => {
  res.json(leerArchivo('citas.json'));
});

app.post('/citas', (req, res) => {
  const citas = leerArchivo('citas.json');
  const nuevaCita = { id: siguienteId(citas), ...req.body };
  citas.push(nuevaCita);
  guardarArchivo('citas.json', citas);
  res.status(201).json(nuevaCita);
});

// ---------- PACIENTES ----------
// READ: todos los pacientes
app.get('/pacientes', (req, res) => {
  res.json(leerArchivo('pacientes.json'));
});

// READ: un paciente por id
app.get('/pacientes/:id', (req, res) => {
  const pacientes = leerArchivo('pacientes.json');
  const paciente = pacientes.find(p => p.id === Number(req.params.id));
  if (!paciente) {
    return res.status(404).json({ error: 'Paciente no encontrado' });
  }
  res.json(paciente);
});

// CREATE: crear paciente
app.post('/pacientes', (req, res) => {
  const { nombre, motivoConsulta, proximaCita } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }
  const pacientes = leerArchivo('pacientes.json');
  const nuevo = {
    id: siguienteId(pacientes),
    nombre,
    motivoConsulta: motivoConsulta || '',
    proximaCita: proximaCita || ''
  };
  pacientes.push(nuevo);
  guardarArchivo('pacientes.json', pacientes);
  res.status(201).json(nuevo);
});

// UPDATE: actualizar paciente
app.put('/pacientes/:id', (req, res) => {
  const pacientes = leerArchivo('pacientes.json');
  const indice = pacientes.findIndex(p => p.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: 'Paciente no encontrado' });
  }
  pacientes[indice] = { ...pacientes[indice], ...req.body, id: pacientes[indice].id };
  guardarArchivo('pacientes.json', pacientes);
  res.json(pacientes[indice]);
});

// DELETE: eliminar paciente
app.delete('/pacientes/:id', (req, res) => {
  const pacientes = leerArchivo('pacientes.json');
  const indice = pacientes.findIndex(p => p.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: 'Paciente no encontrado' });
  }
  const [eliminado] = pacientes.splice(indice, 1);
  guardarArchivo('pacientes.json', pacientes);
  res.json(eliminado);
});

app.listen(3000, () => {
  console.log('Backend real corriendo en http://localhost:3000');
});