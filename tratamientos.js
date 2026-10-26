// OPERACIÓN 12: rutas RESTful del recurso tratamientos
const ESTADOS = ['Pendiente', 'En curso', 'Realizado'];

module.exports = function (app, { leerArchivo, guardarArchivo, siguienteId }) {
  // READ: todos, o solo los de un paciente con ?pacienteId=1
  app.get('/tratamientos', (req, res) => {
    let lista = leerArchivo('tratamientos.json');
    if (req.query.pacienteId) {
      lista = lista.filter((t) => t.pacienteId === Number(req.query.pacienteId));
    }
    res.json(lista);
  });

  // READ: uno por id
  app.get('/tratamientos/:id', (req, res) => {
    const t = leerArchivo('tratamientos.json').find((x) => x.id === Number(req.params.id));
    if (!t) return res.status(404).json({ error: 'Tratamiento no encontrado' });
    res.json(t);
  });

  // CREATE
  app.post('/tratamientos', (req, res) => {
    const { pacienteId, nombre, fecha, estado } = req.body;
    if (!pacienteId || !nombre) {
      return res.status(400).json({ error: 'pacienteId y nombre son obligatorios' });
    }
    const existe = leerArchivo('pacientes.json').some((p) => p.id === Number(pacienteId));
    if (!existe) {
      return res.status(400).json({ error: 'El paciente indicado no existe' });
    }
    if (estado && !ESTADOS.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido. Usa: ' + ESTADOS.join(', ') });
    }
    const lista = leerArchivo('tratamientos.json');
    const nuevo = {
      id: siguienteId(lista),
      pacienteId: Number(pacienteId),
      nombre,
      fecha: fecha || '',
      estado: estado || 'Pendiente',
    };
    lista.push(nuevo);
    guardarArchivo('tratamientos.json', lista);
    res.status(201).json(nuevo);
  });

  // UPDATE
  app.put('/tratamientos/:id', (req, res) => {
    const lista = leerArchivo('tratamientos.json');
    const i = lista.findIndex((x) => x.id === Number(req.params.id));
    if (i === -1) return res.status(404).json({ error: 'Tratamiento no encontrado' });
    if (req.body.estado && !ESTADOS.includes(req.body.estado)) {
      return res.status(400).json({ error: 'Estado inválido. Usa: ' + ESTADOS.join(', ') });
    }
    lista[i] = { ...lista[i], ...req.body, id: lista[i].id };
    guardarArchivo('tratamientos.json', lista);
    res.json(lista[i]);
  });

  // DELETE
  app.delete('/tratamientos/:id', (req, res) => {
    const lista = leerArchivo('tratamientos.json');
    const i = lista.findIndex((x) => x.id === Number(req.params.id));
    if (i === -1) return res.status(404).json({ error: 'Tratamiento no encontrado' });
    const [eliminado] = lista.splice(i, 1);
    guardarArchivo('tratamientos.json', lista);
    res.json(eliminado);
  });
};
