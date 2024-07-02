const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const   bdh = require('../../public/bd/higienizacion.json'),
        bdl = require('../../public/bd/lotes.json'),
        bdu = require('../../public/bd/usuarios.json')


const higiRouter = express.Router()

console.log(bdh)

higiRouter.get('/api/higienizaciones', async (req, resp) => {
    try {
        const higienizacion = bdh.map(higienizacion =>{
            const lote = bdl.find(l => l.id_lotes === higienizacion.id_lote )

            // Encuentra el usuario asociado a la actividad
            const usuario = bdu.find(u => u.id_usuario === higienizacion.id_usuario);

            return{
                id_higienizacion: higienizacion.id_higienizacion,
                fecha: higienizacion.fecha,
                nombre_usuario: usuario ? usuario.nombres : 'no',
                numero_lote: lote ? lote.nro_lote : 'no' , 
                apellido_usuario: usuario ? usuario.apellidos : 'no',
                residuos: higienizacion.residuos,
                higienizacion: higienizacion.higienizacion
            }
        })
        
        resp.send(higienizacion)
    } catch (error) {
        console.error(error);
        resp.status(500).send('Error al obtener las higienizaciones');
    }
});

higiRouter.post('/api/higienizaciones', async (req,resp) =>{
    try {
        const shorterUuid = uuidv4().substring(0, 8)
        const nuevaHigienizacion = {
            id_higienizacion: shorterUuid,
            fecha: req.body.fecha,
            higienizacion: req.body.higienizacion,
            id_lote: req.body.id_lote,
            id_usuario: req.body.id_usuario,
            residuos: req.body.residuos
        }
            
        if (!nuevaHigienizacion.residuos || !nuevaHigienizacion.higienizacion) {
            return resp.status(400).send("Debe ingresar todos los datos");
        }
            bdh.push(nuevaHigienizacion)

            fs.writeFileSync('./public/bd/higienizacion.json', JSON.stringify(bdh, null, 2));

            resp.status(201).json(nuevaHigienizacion);


            } catch (error) {
                // Capturar y manejar cualquier error que ocurra durante la inserción
                console.error('Error al agregar la actividad:', error.message);
                resp.status(500).send('Error al agregar la actividad');
            }
})


module.exports = higiRouter