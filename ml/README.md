# Módulo de Machine Learning — detección de caries (PEA: operaciones 13 a 16)

Objetivo: entrenar un modelo que, a partir de una foto intraoral, indique si **hay caries o no**, y usarlo dentro de OdontoHistoria IA como **apoyo** a la revisión del odontólogo. **No reemplaza el diagnóstico profesional.**

## Contenido

| Archivo | Descripción |
|---|---|
| `OdontoHistoria_PEA4_ML.ipynb` | Cuaderno de Google Colab: descarga el dataset, arma etiquetas, divide por paciente, entrena (MobileNetV2, transfer learning), evalúa y exporta. |
| `resultados/metricas.json` | Métricas reales en el conjunto de prueba. |
| `resultados/matriz_confusion.png`, `curvas_entrenamiento.png` | Gráficos generados por el cuaderno. |
| `resultados/caries_model.tflite` | Modelo exportado (2.5 MB). El `.keras` (21 MB) no se sube a GitHub. |
| `capturas/` | Capturas reales de la ejecución en Colab (evidencia). |
| `registro_uso_ia.md` | Registro de herramientas de IA usadas (operación 16). |

## Cómo ejecutarlo

1. Abrir el cuaderno en Google Colab (Archivo → Abrir cuaderno → GitHub).
2. Entorno de ejecución → Cambiar tipo de entorno → GPU (T4).
3. Ejecutar las celdas en orden (el dataset pesa ~1.6 GB; la descarga tarda unos 6 min).

## Dataset

*Annotated intraoral image dataset for dental caries detection* (Zenodo, registro 14827784, Scientific Data 12, 1297, 2025). Licencia **CC BY 4.0** (se debe dar atribución a los autores). Son 6265 fotos JPG con anotaciones de detección (formato YOLO). Etiqueta usada aquí: foto **con caries** si tiene al menos un recuadro anotado; **sin caries** si no tiene ninguno. (El dataset no incluye archivo con los nombres de las clases; se tomó cualquier recuadro como lesión.)

## Resultados (ejecución real del 22/11/2026, GPU T4, TensorFlow 2.21)

División **por paciente** (las fotos de un mismo paciente no se reparten entre entrenamiento y prueba): 4374 entrenamiento · 970 validación · 921 prueba. Verificado en el cuaderno: 0 pacientes repetidos entre entrenamiento y prueba.

Conjunto de prueba (921 fotos que el modelo nunca vio):

| Métrica | Valor |
|---|---|
| Exactitud | 0.877 |
| Precisión (con caries) | 0.810 |
| Sensibilidad (con caries) | 0.838 |
| F1 (con caries) | 0.824 |

Matriz de confusión: 544 sin caries bien clasificadas, 62 sin caries marcadas como caries, 51 caries no detectadas, 264 caries detectadas.

## Limitaciones (importante)

- Unas 760 fotos no traen código de paciente en el nombre del archivo; se trataron como pacientes individuales, por lo que podría haber algo de fuga de información entre divisiones.
- La proporción de caries cambia mucho según la vista (p. ej. oclusales y mandibulares tienen mucha más caries que las frontales); el modelo podría aprender parte de la vista y no solo la lesión.
- Se tomó "cualquier recuadro = caries" sin conocer los nombres de las clases del dataset.
- Dataset de un solo origen; no se probó con fotos de la clínica Fassiara ni con celulares distintos.
- Es una clasificación de la foto completa: no localiza la caries. Resultado orientativo, **siempre revisa el odontólogo**.

## Estado

- [x] Operación 13: cuaderno ejecutado en Colab (entorno, dataset, etiquetas).
- [x] Operación 14: modelo entrenado y evaluado.
- [ ] Operación 15: modelo exportado (hecho: `.keras` y `.tflite`) e integrado en el proyecto (pendiente).
- [ ] Operación 16: registro de uso de herramientas de IA.
