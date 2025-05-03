const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Tu lógica de ventas:
const productos = [
  { nombre: 'Producto A', precio: 10 },
  { nombre: 'Producto B', precio: 20 },
  { nombre: 'Producto C', precio: 15 },
  { nombre: 'Producto D', precio: 25 },
  { nombre: 'Producto E', precio: 30 }
];

function generarVentas() {
  const ventas = [];
  for (let i = 0; i < 100; i++) {
    const producto = productos[Math.floor(Math.random() * productos.length)];
    ventas.push({ nombre: producto.nombre, precio: producto.precio });
  }
  return ventas;
}

// API de ventas
app.get('/api/ventas', (req, res) => {
  res.json(generarVentas());
});

// Servir React desde aquí 👇
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
