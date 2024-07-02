const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const   bda = require('../../public/bd/actividades.json'),
        bdv = require('../../public/bd/vanunas.json'),
        bdl = require('../../public/bd/lotes.json'),
        bdu = require('../../public/bd/usuarios.json')

const verificarCampos = require('../middleware/actiMiddleware')




const actiRouter = express.Router()


actiRouter.get('/api/actividades', async (req, resp) => {
    try {
        const actividades = bda.map(actividades =>{
            const lote = bdl.find(l => l.id_lotes === actividades.id_lote )

            // Encuentra el usuario asociado a la actividad
            const usuario = bdu.find(u => u.id_usuario === actividades.id_usuario);

            // Encuentra la vacuna asociada a la actividad
            const vacuna = bdv.find(v => v.id_vacuna === actividades.id_vacuna);

            return{
                id_actividad: actividades.id_actividad,
                fecha: actividades.fecha,
                hora: actividades.hora,
                agua: actividades.agua || 'no',
                huevos: actividades.huevos || 'no',
                alimento: actividades.alimento || 'no',
                vacuna: vacuna ? vacuna.vacuna : 'no',
                numero_lote: lote ? lote.nro_lote : 'no' , 
                nombre_usuario: usuario ? usuario.nombres : 'no',
                apellido_usuario: usuario ? usuario.apellidos : 'no'
            }
        })
        
        resp.send(actividades)
    } catch (error) {
        console.error(error);
        resp.status(500).send('Error al obtener las actividades');
    }
});

actiRouter.get('/api/vacunas', async (req, resp) => {
    try {
        const vacunas = bdv
        resp.send(vacunas)
    } catch (error) {
        console.error('Error al obtener los tipos de vacunas:', error);
        resp.status(500).json({ error: 'Error al obtener los tipos de vacunas' });
    }
});

actiRouter.get('/api/lotes', async (req, resp) => {
    try {
        const lotes = bdl
        resp.send(lotes)
    } catch (error) {
        console.error('Error al obtener los numero de lote:', error);
        resp.status(500).json({ error: 'Error al obtener los numeros de lote' });
    }
});

actiRouter.get('/api/usuario', async (req, resp) => {
    try {
        const usuario = bdu
        resp.send(usuario)
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        resp.status(500).json({ error: 'Error al obtener usuario' });
    }
});

actiRouter.post('/api/actividades', verificarCampos, async (req,resp) =>{
    try {
            bda.push(req.nuevaActividad)

            fs.writeFileSync('./public/bd/actividades.json', JSON.stringify(bda, null, 2));

            resp.status(201).json(req.nuevaActividad);

            } catch (error) {
                // Capturar y manejar cualquier error que ocurra durante la inserción
                console.error('Error al agregar la actividad:', error.message);
                resp.status(500).send('Error al agregar la actividad');
            }
})

module.exports = actiRouter