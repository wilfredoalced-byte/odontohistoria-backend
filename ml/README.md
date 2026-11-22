# Módulo de Machine Learning — detección de caries (PEA: operaciones 13 a 16)

Objetivo: entrenar un modelo que, a partir de una imagen dental, indique si **hay caries o no** y usarlo dentro de OdontoHistoria IA como apoyo a la revisión del odontólogo (no reemplaza el diagnóstico profesional).

## Contenido

| Archivo | Descripción |
|---|---|
| `OdontoHistoria_PEA4_ML.ipynb` | Cuaderno de Google Colab: descarga el dataset, arma etiquetas, entrena (MobileNetV2 con transfer learning), evalúa y exporta el modelo. |
| `resultados/` | Métricas, gráficos y modelo exportado (se agregan después de ejecutar el cuaderno en Colab). |
| `registro_uso_ia.md` | Registro de las herramientas de IA usadas durante el desarrollo (operación 16). |

## Cómo ejecutarlo

1. Abrir el cuaderno en Google Colab (Archivo → Abrir cuaderno → GitHub, o desde la URL del repositorio).
2. Entorno de ejecución → **Cambiar tipo de entorno** → GPU (T4).
3. Ejecutar las celdas en orden. La descarga del dataset pesa ~1.6 GB y tarda unos minutos.

## Dataset

Dataset público de imágenes dentales publicado en Zenodo (registro 14827784). Se usa solo para este trabajo académico; revisar su licencia antes de cualquier uso comercial.

## Estado

- [ ] Operación 13: cuaderno ejecutado en Colab (entorno, dataset, etiquetas).
- [ ] Operación 14: modelo entrenado y evaluado.
- [ ] Operación 15: modelo exportado e integrado.
- [ ] Operación 16: registro de uso de herramientas de IA.

> Los resultados reales (precisión, recall, matriz de confusión) se agregan aquí solo después de ejecutar el cuaderno.
