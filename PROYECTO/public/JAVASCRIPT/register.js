document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
    // Obtener valores del formulario
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
  
    // Enviar los datos del nuevo usuario al servidor
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/registro', true); // Endpoint del servidor para el registro
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Usuario registrado exitosamente');
        // Aquí podrías redirigir al usuario a la página de inicio de sesión o realizar otras acciones
      } else {
        console.error('Error al registrar usuario');
      }
    };
  
    xhr.onerror = function() {
      console.error('Error de red al registrar usuario');
    };
  
    const datosUsuario = {
      correo: correo,
      password: password
    };
  
    xhr.send(JSON.stringify(datosUsuario));
  });
  
  const express = require('express');
  const bodyParser = require('body-parser');
  const MongoClient = require('mongodb').MongoClient;
  
  const app = express();
  app.use(bodyParser.json());
  
  const url = 'mongodb+srv://admin:master02@myapp.wfltbdv.mongodb.net/MyAppDB';
  
  app.post('/registro', async (req, res) => {
    try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db('Proyecto');
      const collection = db.collection('usuarios');
  
      // Obtener los datos del usuario desde la solicitud
      const { correo, password } = req.body;
  
      // Verificar si el usuario ya existe en la base de datos
      const usuarioExistente = await collection.findOne({ correo: correo });
  
      if (usuarioExistente) {
        res.status(400).send('El usuario ya existe');
      } else {
        // Crear un nuevo documento de usuario y guardarlo en la base de datos
        const nuevoUsuario = { correo, password };
        await collection.insertOne(nuevoUsuario);
        res.status(200).send('Usuario registrado correctamente');
      }
  
      client.close();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al procesar la solicitud');
    }
  });
  
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });