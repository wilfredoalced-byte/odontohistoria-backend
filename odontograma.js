// OPERACIÓN 12: rutas RESTful del odontograma de cada paciente
const ESTADOS = ['Sano', 'Caries', 'Tratado'];

module.exports = function (app, { leerArchivo, guardarArchivo, siguienteId }) {
  // READ: odontograma completo de un paciente
  app.get('/pacientes/:id/odontograma', (req, res) => {
    const pacienteId = Number(req.params.id);
    const existe = leerArchivo('pacientes.json').some((p) => p.id === pacienteId);
    if (!existe) return res.status(404).json({ error: 'Paciente no encontrado' });
    const piezas = leerArchivo('odontograma.json').filter((o) => o.pacienteId === pacienteId);
    res.json(piezas);
  });

  // CREATE o UPDATE: marcar el estado de una pieza (si ya existe, se actualiza)
  app.put('/pacientes/:id/odontograma/:pieza', (req, res) => {
    const pacienteId = Number(req.params.id);
    const pieza = Number(req.params.pieza);
    const { estado } = req.body;

    const existe = leerArchivo('pacientes.json').some((p) => p.id === pacienteId);
    if (!existe) return res.status(404).json({ error: 'Paciente no encontrado' });
    if (!Number.isInteger(pieza) || pieza < 11 || pieza > 48) {
      return res.status(400).json({ error: 'Pieza dental inválida (usa numeración FDI, de 11 a 48)' });
    }
    if (!ESTADOS.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido. Usa: ' + ESTADOS.join(', ') });
    }

    const lista = leerArchivo('odontograma.json');
    const i = lista.findIndex((o) => o.pacienteId === pacienteId && o.pieza === pieza);
    let registro;
    if (i === -1) {
      registro = { id: siguienteId(lista), pacienteId, pieza, estado };
      lista.push(registro);
    } else {
      lista[i] = { ...lista[i], estado };
      registro = lista[i];
    }
    guardarArchivo('odontograma.json', lista);
    res.json(registro);
  });

  // DELETE: quitar la marca de una pieza (vuelve a considerarse sana)
  app.delete('/pacientes/:id/odontograma/:pieza', (req, res) => {
    const pacienteId = Number(req.params.id);
    const pieza = Number(req.params.pieza);
    const lista = leerArchivo('odontograma.json');
    const i = lista.findIndex((o) => o.pacienteId === pacienteId && o.pieza === pieza);
    if (i === -1) return res.status(404).json({ error: 'Esa pieza no tiene registro' });
    const [eliminado] = lista.splice(i, 1);
    guardarArchivo('odontograma.json', lista);
    res.json(eliminado);
  });
};
