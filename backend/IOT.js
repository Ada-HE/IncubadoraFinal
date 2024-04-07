const express = require('express');
const mqtt = require('mqtt');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// URI de MongoDB y cliente de MongoDB inicializado
const mongoUri = process.env.MONGODB_URI;
console.log('Conectando a MongoDB con URI:', mongoUri);
const clientmongo = new MongoClient(mongoUri);

// Conexión al broker MQTT con credenciales
console.log('Conectando al broker MQTT...');
const mqttClient = mqtt.connect('mqtt://broker.emqx.io', {
  port: 1883,
  username: 'incubadora',
  password: 'qwe123456'
});

// Objeto para almacenar datos de MQTT por clave
const mqttDataByClave = {};

// Conectar con MongoDB
async function connectMongoClient() {
  try {
    await clientmongo.connect();
    console.log('Conectado a MongoDB.');
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error);
    process.exit(1);
  }
}

connectMongoClient();

// Función para manejar mensajes MQTT recibidos
const handleMqttMessage = async (topic, message) => {
  console.log(`Mensaje recibido en el tema ${topic}: ${message}`);
  const [, , clave] = topic.split('/');

  if (topic.startsWith('huellitas/info')) {
    console.log(`Procesando mensaje para dispositivo con clave: ${clave}`);
    try {
      const data = JSON.parse(message.toString());
      console.log(`Datos parseados del dispositivo ${clave}:`, data);

      const filter = { Clave: clave };
      const updateData = {
        $set: {
          'estados.led1': data.led1,
          'estados.led2': data.led2,
          'estados.tanque': data.estado,
          'sensores.temperatura': data.temperatura,
          'sensores.humedad': data.humedad,
        }
      };

      // Conectar a la colección de MongoDB y actualizar el documento
      const incubadora = clientmongo.db("huellitasfelices").collection('incubadoras');
      console.log(`Actualizando dispositivo en MongoDB con clave: ${clave}`);
      const updateResult = await incubadora.updateOne(filter, updateData, { upsert: true });

      if (updateResult.matchedCount === 0) {
        console.log(`Documento con clave ${clave} creado.`);
      } else if (updateResult.modifiedCount === 0) {
        console.log(`Documento con clave ${clave} ya está actualizado.`);
      } else {
        console.log(`Documento con clave ${clave} actualizado con éxito.`);
      }
    } catch (error) {
      console.error(`Error al manejar la información del mensaje para dispositivo ${clave}:`, error);
    }
  } else {
    console.log(`Mensaje recibido en tópico no reconocido: ${topic}`);
  }
};

// Suscribirse a temas MQTT cuando la conexión esté establecida
mqttClient.on('connect', () => {
  console.log('Broker MQTT conectado. Suscribiendo a tópicos...');
  mqttClient.subscribe('huellitas/info/#', (err) => {
    if (err) {
      console.error('Error al suscribirse al tópico:', err);
    } else {
      console.log('Suscripción a tópicos MQTT exitosa.');
    }
  });
});

// Manejar mensajes recibidos llamando a handleMqttMessage
mqttClient.on('message', handleMqttMessage);

// Crea un router de Express para manejar rutas MQTT
const mqttrouter = express.Router();

// Encender una led
mqttrouter.post('/dispositivos/comando', (req, res) => {
  const { claveDispositivo, comando } = req.body;
  const topic = `huellitas/incu/${claveDispositivo}`;
  console.log(`Publicando mensaje en el topic ${topic}: ${comando}`);

  mqttClient.publish(topic, comando, (err) => {
    if (err) {
      console.error(`Error al publicar mensaje MQTT para dispositivo ${claveDispositivo}:`, err);
      return res.status(500).send('Error al publicar el mensaje MQTT.');
    }
    console.log(`Mensaje para dispositivo ${claveDispositivo} publicado con éxito en el topic ${topic}.`);
    res.status(200).send(`Comando ${comando} enviado al dispositivo con clave ${claveDispositivo}.`);
  });
});

module.exports = mqttrouter;
