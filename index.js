
console.clear()

const PUERTO = 7288
const path = require('path')
const express = require('express') 
const expressApp = express() 
const cors = require('cors')



const rutasApp = require('./routes/adminRoutes')

// Middleware para servir archivos estáticos desde 'public'
expressApp.use(express.static(path.join(__dirname, 'public')));

// Rutas para servir archivos estáticos desde 'node_modules'
expressApp.use(express.static(path.join(__dirname, 'node_modules')));

// Rutas para servir archivos estáticos desde 'views'
expressApp.use(express.static(path.join(__dirname, 'views')));

expressApp.use(cors());

expressApp.use('/', rutasApp)



expressApp.listen(PUERTO, () =>{
    console.log(`Servidor listo en http://localhost:${PUERTO}`)
})



