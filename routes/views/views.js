const express = require('express')
const path = require('path')

const viewsRouter = express.Router()

// Ruta para servir el archivo HTML principal
viewsRouter.get('/index', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rutas adicionales para otras vistas
viewsRouter.get('/galpones', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'galpones.html'));
});

viewsRouter.get('/lotes', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'lotes.html'));
});

viewsRouter.get('/actividades', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'actividades.html'));
});

viewsRouter.get('/higienizaciones', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'higienizaciones.html'));
});

viewsRouter.get('/novedades', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'novedades.html'));
});

module.exports = viewsRouter