const express = require('express')
const cors = require('cors')

const routerActividades = require('./actividades/actividades')
const routerHigienizaciones = require('./Higienizaciones/higienizaciones')
const routerViews = require('./views/views')
const routerNovedades = require('./novedad/novedad')
const routerLote = require('./lote/lote')

const rutas = express.Router()

const fs = require('fs') // IMPORTANTE

//middlewares de express
rutas.use(express.json()) 
rutas.use(express.text()) 
rutas.use(cors())

//middlewares de aplicacion
rutas.use('/', routerActividades)
rutas.use('/', routerHigienizaciones)
rutas.use('/', routerViews)
rutas.use('/', routerNovedades)
rutas.use('/', routerLote)

module.exports = rutas