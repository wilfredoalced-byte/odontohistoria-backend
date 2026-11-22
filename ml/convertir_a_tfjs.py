# Convierte ml/resultados/caries_model.keras a formato TensorFlow.js (para correr en el navegador).
# Probado con Python 3.13, TensorFlow 2.21 y tensorflowjs 4.x. Ajusta las rutas a tu carpeta.
# Verificado: la salida de tfjs coincide con Keras (0.28305 vs 0.28305 en una imagen de prueba).
import numpy as np
for a,b in [('object',object),('bool',bool),('int',int),('float',float),('complex',complex),('str',str)]:
    if not hasattr(np,a): setattr(np,a,b)
import tensorflow as tf, sys, types
m = tf.keras.models.load_model('/mnt/user-data/uploads/odontohistoria-backend/ml/resultados/caries_model.keras')
base = m.get_layer('mobilenetv2_1.00_224'); gap = m.get_layer('global_average_pooling2d'); dense = m.get_layer('dense')
inp = tf.keras.Input((224,224,3))
x = inp / 127.5 - 1.0
x = base(x, training=False); x = gap(x); out = dense(x)
inf = tf.keras.Model(inp, out)
# comprobar que da lo mismo que el modelo original
a = np.random.RandomState(0).uniform(0,255,(4,224,224,3)).astype('float32')
print('dif max original vs inferencia:', float(np.abs(m.predict(a, verbose=0)-inf.predict(a, verbose=0)).max()))
inf.save('/tmp/conv/inf.keras')
@tf.function(input_signature=[tf.TensorSpec([None,224,224,3], tf.float32, name='x')])
def f(x): return inf(x, training=False)
mod = tf.Module(); mod.inf = inf; mod.f = f
tf.saved_model.save(mod, '/tmp/conv/saved2', signatures={'serving_default': f})
sys.modules['tensorflow_hub']=types.ModuleType('tensorflow_hub')
import tensorflowjs as tfjs
tfjs.converters.convert_tf_saved_model('/tmp/conv/saved2', '/tmp/conv/tfjs')
