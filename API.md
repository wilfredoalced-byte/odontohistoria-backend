# API REST de OdontoHistoria IA

Backend en Node.js + Express. Dirección base: `http://localhost:3000`
Formato de datos: JSON. Los datos se guardan en archivos `.json`.

## Convenciones

| Código | Significado |
|---|---|
| 200 | Operación correcta |
| 201 | Recurso creado |
| 400 | Datos inválidos o faltantes |
| 404 | Recurso no encontrado |

Los errores devuelven `{ "error": "mensaje" }`.

## Citas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/citas` | Lista todas las citas |
| POST | `/citas` | Crea una cita |

## Pacientes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pacientes` | Lista todos los pacientes |
| GET | `/pacientes/:id` | Obtiene un paciente |
| POST | `/pacientes` | Crea un paciente (`nombre` obligatorio) |
| PUT | `/pacientes/:id` | Actualiza los campos enviados |
| DELETE | `/pacientes/:id` | Elimina un paciente |

Campos: `nombre`, `motivoConsulta`, `proximaCita`.

## Tratamientos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/tratamientos` | Lista todos. Filtro opcional: `?pacienteId=1` |
| GET | `/tratamientos/:id` | Obtiene un tratamiento |
| POST | `/tratamientos` | Crea (`pacienteId` y `nombre` obligatorios) |
| PUT | `/tratamientos/:id` | Actualiza los campos enviados |
| DELETE | `/tratamientos/:id` | Elimina un tratamiento |

Campos: `pacienteId`, `nombre`, `fecha`, `estado` (`Pendiente`, `En curso` o `Realizado`).

## Odontograma

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pacientes/:id/odontograma` | Piezas marcadas de un paciente |
| PUT | `/pacientes/:id/odontograma/:pieza` | Marca o actualiza una pieza |
| DELETE | `/pacientes/:id/odontograma/:pieza` | Quita la marca de una pieza |

La pieza usa numeración FDI (11 a 48). Estados: `Sano`, `Caries` o `Tratado`.
Las piezas sin registro se consideran sanas.

## Consentimientos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/consentimientos/textos` | Textos vigentes de cada consentimiento y su versión |
| GET | `/pacientes/:id/consentimientos` | Estado de cada consentimiento del paciente |
| PUT | `/pacientes/:id/consentimientos/:tipo` | Acepta o retira un consentimiento: `{ "aceptado": true }` |

Tipos: `tratamiento` (historia clínica digital) e `imagenes_ia` (fotos intraorales con el asistente de IA).
Cada registro guarda la fecha del último cambio y la versión del texto aceptado. Un tipo sin registro figura como no aceptado.
Los textos actuales son un borrador pendiente de revisión legal.
