const express = require('express');
const conectarDB = require('./config/db'); // Asegúrate de que la ruta sea correcta

const app = express();

// Conecta a MongoDB Atlas antes de arrancar el servidor
conectarDB();

app.use(express.json());

// Prueba de ruta
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Aquí puedes agregar tus rutas reales (ejemplo):
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
