# Registro de uso de herramientas de IA (operación 16)

Registro de las herramientas de IA usadas en el módulo de Machine Learning y la integración. Solo incluye lo que realmente se hizo.

| Fecha | Herramienta | Para qué se usó | Qué se revisó / validó |
|---|---|---|---|
| 22/11/2026 | Claude (asistente de IA, modo agente) | Escribir el cuaderno de Colab (`OdontoHistoria_PEA4_ML.ipynb`): descarga del dataset, etiquetas, entrenamiento con MobileNetV2 y evaluación. | Se ejecutó celda por celda en Colab (GPU T4) y se guardaron capturas de cada salida (`capturas/`). |
| 22/11/2026 | Claude | Revisar los datos antes de entrenar: se detectó que había fotos del mismo paciente en varias carpetas, por lo que se cambió la división a **por paciente** (sin pacientes repetidos entre entrenamiento y prueba). | Se verificó en el cuaderno: 0 pacientes repetidos entre entrenamiento y prueba. Se documentaron las limitaciones en `ml/README.md`. |
| 22/11/2026 | Claude | Exportar el modelo (`.keras`, `.tflite`) y resumir resultados en el README. | Las métricas del README se copiaron de `resultados/metricas.json` generado por el cuaderno (exactitud 0.877; sensibilidad 0.838; precisión 0.810). |
| 22/11/2026 | Google Colab (GPU T4, TensorFlow 2.21) | Entorno de ejecución del entrenamiento. | Captura del entorno y de la GPU (`capturas/08_...`). |
| 22/11/2026 | Gemini (panel de Colab) | No se usó: el panel se abrió por error y se cerró sin enviar ninguna consulta. | — |

## Reglas de uso

- El modelo es una ayuda: **no reemplaza el diagnóstico del odontólogo**.
- Todo resultado de IA se verifica ejecutándolo y revisando la salida real antes de citarlo en un informe.
- Dataset público con licencia CC BY 4.0 (Zenodo 14827784), con atribución a sus autores.

> Si el estudiante usó otras herramientas de IA en este módulo (por ejemplo para consultas o redacción), agregarlas aquí con su fecha real.
