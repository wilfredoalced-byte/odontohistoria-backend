// Consentimientos informados de cada paciente (datos de salud = datos sensibles).
// Cada consentimiento guarda: quién, de qué tipo, si aceptó o retiró, cuándo y con qué versión del texto.
const TIPOS = {
  tratamiento: {
    titulo: 'Consentimiento para tratamiento y registro de la historia clínica',
    texto:
      'Autorizo a la clínica odontológica Fassiara a registrar mis datos personales y de salud en mi historia clínica ' +
      'digital (odontograma, tratamientos y citas) con la finalidad de brindarme atención odontológica. ' +
      'Entiendo que puedo solicitar el acceso, la corrección o la eliminación de mis datos cuando lo desee.',
  },
  imagenes_ia: {
    titulo: 'Consentimiento para el uso de fotografías intraorales con el asistente de IA',
    texto:
      'Autorizo que se tomen fotografías de mi boca y que se analicen con un asistente de inteligencia artificial que ' +
      'sugiere posibles caries. Entiendo que la sugerencia es solo un apoyo y que el diagnóstico lo realiza el odontólogo. ' +
      'Este permiso es independiente del tratamiento: puedo negarlo o retirarlo en cualquier momento sin perder mi atención.',
  },
};
const VERSION_TEXTO = '2026-11-borrador'; // cambiar al aprobar los textos definitivos

module.exports = function (app, { leerArchivo, guardarArchivo, siguienteId }) {
  // Textos vigentes (para que la app y el panel muestren lo mismo)
  app.get('/consentimientos/textos', (req, res) => {
    res.json({ version: VERSION_TEXTO, tipos: TIPOS });
  });

  // READ: consentimientos de un paciente. Los tipos sin registro figuran como no aceptados.
  app.get('/pacientes/:id/consentimientos', (req, res) => {
    const pacienteId = Number(req.params.id);
    if (!leerArchivo('pacientes.json').some((p) => p.id === pacienteId)) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    const guardados = leerArchivo('consentimientos.json').filter((c) => c.pacienteId === pacienteId);
    const resultado = Object.keys(TIPOS).map(
      (tipo) =>
        guardados.find((c) => c.tipo === tipo) || {
          pacienteId, tipo, aceptado: false, fecha: null, version: null,
        }
    );
    res.json(resultado);
  });

  // CREATE o UPDATE: aceptar o retirar un consentimiento (queda la fecha del último cambio)
  app.put('/pacientes/:id/consentimientos/:tipo', (req, res) => {
    const pacienteId = Number(req.params.id);
    const { tipo } = req.params;
    const { aceptado } = req.body;
    if (!leerArchivo('pacientes.json').some((p) => p.id === pacienteId)) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    if (!TIPOS[tipo]) {
      return res.status(400).json({ error: 'Tipo inválido. Usa: ' + Object.keys(TIPOS).join(', ') });
    }
    if (typeof aceptado !== 'boolean') {
      return res.status(400).json({ error: 'El campo aceptado debe ser true o false' });
    }
    const lista = leerArchivo('consentimientos.json');
    const i = lista.findIndex((c) => c.pacienteId === pacienteId && c.tipo === tipo);
    const datos = { pacienteId, tipo, aceptado, fecha: new Date().toISOString(), version: VERSION_TEXTO };
    let registro;
    if (i === -1) {
      registro = { id: siguienteId(lista), ...datos };
      lista.push(registro);
    } else {
      registro = { ...lista[i], ...datos };
      lista[i] = registro;
    }
    guardarArchivo('consentimientos.json', lista);
    res.json(registro);
  });
};
