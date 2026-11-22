# OdontoHistoria IA — Backend (API REST)

Backend del proyecto **OdontoHistoria IA** para la clínica dental **Fassiara**. Es una API REST hecha con **Node.js + Express** que guarda los datos en archivos `.json` y atiende a la app Android del paciente y al panel web de la clínica.

- **Estudiante:** Wilfredo Alcedo Santiago (ID 001634197)
- **Carrera:** Ingeniería de Software con IA — SENATI, bloque 32 PIADS401 2026
- **Instructor:** Darwin Uzuriaga Claudio
- **Empresa:** Lihon Corporation E.I.R.L

## Los 3 repositorios del proyecto

| Parte | Repositorio |
|---|---|
| Backend (API REST + módulo de Machine Learning) — **este repositorio** | https://github.com/wilfredoalced-byte/odontohistoria-backend |
| Panel web de la clínica (React + Vite, incluye la pestaña "IA (apoyo)") | https://github.com/wilfredoalced-byte/odontohistoria-frontend |
| App Android del paciente (Java) | https://github.com/wilfredoalced-byte/odontohistoria-app |

## Qué hay en este repositorio

| Carpeta / archivo | Qué es |
|---|---|
| `server.js` | Servidor principal (Express, puerto 3000), citas y pacientes. |
| `tratamientos.js`, `odontograma.js`, `consentimientos.js` | Rutas de tratamientos, odontograma por paciente y consentimientos informados. |
| `*.json` | Datos de ejemplo (citas, pacientes, tratamientos, odontograma, consentimientos). |
| `API.md` | Documentación de todos los endpoints. |
| `ml/` | **Módulo de Machine Learning** (PEA operaciones 13 a 16): cuaderno de Colab, modelo, métricas, capturas y registro de uso de IA. Ver `ml/README.md`. |

## Cómo abrirlo y ejecutarlo (paso a paso)

**Requisitos:** tener instalados [Node.js](https://nodejs.org) (versión 18 o superior; se probó con la 22) y Git.

1. Descargar el proyecto:
   ```bash
   git clone https://github.com/wilfredoalced-byte/odontohistoria-backend.git
   cd odontohistoria-backend
   ```
2. Instalar las dependencias (express y cors):
   ```bash
   npm install
   ```
3. Encender el servidor:
   ```bash
   node server.js
   ```
   Debe mostrar: `Backend real corriendo en http://localhost:3000`
4. Comprobar que funciona: abrir en el navegador http://localhost:3000/pacientes (debe mostrar la lista de pacientes en JSON).
5. Para detenerlo: `Ctrl + C` en la terminal.

> El servidor se queda corriendo en esa terminal. Para usar el panel web o la app, déjalo encendido y abre otra terminal.

## Cómo ver el sistema completo funcionando

1. **Backend** (este repositorio): `node server.js` → http://localhost:3000
2. **Panel web:** en el repositorio `odontohistoria-frontend`: `npm install` y `npm run dev` → http://localhost:5173 (ver su README). Allí se ven los pacientes, el odontograma, los tratamientos, los consentimientos y la pestaña **IA (apoyo)** que analiza fotos con el modelo de caries.
3. **App Android:** en el repositorio `odontohistoria-app`, abrir con Android Studio, encender el emulador y ejecutar `adb reverse tcp:3000 tcp:3000` (ver su README).

## API (resumen)

Formato JSON. Dirección base `http://localhost:3000`. Detalle completo de cada endpoint, con ejemplos, en **[API.md](API.md)**.

| Recurso | Para qué sirve |
|---|---|
| Citas | Consultar y crear citas. |
| Pacientes | Crear, listar, editar y eliminar pacientes. |
| Tratamientos | CRUD de tratamientos por paciente. |
| Odontograma | Estado de cada pieza dental (Sano / Caries / Tratado) por paciente. |
| Consentimientos | Consentimientos informados por paciente. |

## Módulo de Machine Learning (detección de caries)

Dentro de la carpeta [`ml/`](ml/) está el trabajo de las operaciones 13 a 16 del PEA: se entrenó un modelo **MobileNetV2** con un dataset público de fotos intraorales (Zenodo, CC BY 4.0), dividido por paciente. Resultado en 921 fotos de prueba: **exactitud 87.7 %, precisión 81.0 %, sensibilidad 83.8 %, F1 82.4 %**. El modelo se exportó a `.tflite` y a TensorFlow.js y se integró en el panel web. Es una herramienta de **apoyo**: no reemplaza el diagnóstico del odontólogo. Todo el detalle (cómo ejecutarlo, resultados, limitaciones y registro de uso de IA) está en **[ml/README.md](ml/README.md)**.

## Ramas

| Rama | Contenido |
|---|---|
| `main` | Versión estable del backend. |
| `feature/ml-caries` | Módulo de Machine Learning (cuaderno, modelo, métricas, capturas). |

## Datos y privacidad

- Los datos de ejemplo son de prueba; los datos de salud son sensibles y, para producción, faltan HTTPS, autenticación real y la política de privacidad.
- Los textos de consentimiento son un **borrador** y requieren revisión legal antes de usarse.
- El modelo grande (`.keras`, 21 MB) y el dataset no se suben a GitHub (ver `.gitignore`).
