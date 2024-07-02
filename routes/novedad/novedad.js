const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const bdn = require('../../public/bd/novedad.json'),
bdl = require('../../public/bd/lotes.json'),
bdu = require('../../public/bd/usuarios.json'),
bdt = require('../../public/bd/tipo_novedad.json'),
bdlote = require('../../public/bd/lote.json')

const noveRouter = express.Router();

noveRouter.get('/api/novedad', async (req,resp) =>{
    try{
        const novedades = bdn.map(novedad =>{
            const lote = bdl.find(l =>l.id_lotes === novedad.id_lote)

            const usuario = bdu.find(u => u.id_usuario === novedad.id_usuario)

            const tipoNovedad = bdt.find(t =>t.id_tipo_novedad === novedad.id_tipo_novedad)

            return{
                id_novedad: novedad.id_novedad,
                observacion: novedad.observacion,
                cantidad: novedad.cantidad,
                numero_lote: lote ? lote.nro_lote : 'no' , 
                nombre_usuario: usuario ? usuario.nombres : 'no',
                apellido_usuario: usuario ? usuario.apellidos : 'no',
                tipo_novedad: tipoNovedad ? tipoNovedad.tipo_novedad : 'no'
            }

        })
        resp.send(novedades)


    } catch (error) {
        console.error(error);
        resp.status(500).send('Error al obtener las novedades');
    }
})

noveRouter.get('/api/lotes', async (req, resp) => {
    try {
        const lotes = bdl
        resp.send(lotes)
    } catch (error) {
        console.error('Error al obtener los numero de lote:', error);
        resp.status(500).json({ error: 'Error al obtener los numeros de lote' });
    }
});

noveRouter.get('/api/tipoNovedad', async (req, resp) =>{
    try{
        const tipo_novedad = bdt
        resp.send(tipo_novedad)

    }catch (error) {
        console.error('Error al obtener el tipo de novedad:', error);
        resp.status(500).json({ error: 'Error al obtener el tipo de novedad' });
    }
})

noveRouter.post('/api/novedad', async (req, resp) =>{
    try{
        const shorterUuid = uuidv4().substring(0, 8)
        const nuevaNovedad = { 
            id_novedad: shorterUuid,
            id_lote: req.body.id_lote,
            id_tipo_novedad: req.body.tipo_novedad,
            id_usuario: req.body.id_usuario,
            cantidad: req.body.cantidad,
            observacion: req.body.observacion
        }

        if(!nuevaNovedad.cantidad || !nuevaNovedad.observacion){
            return resp.status(400).send('debe ingresar todos los datos')
        }
        console.log(nuevaNovedad)




        const lote = bdlote.find(lote => lote.id_lotes === nuevaNovedad.id_lote)
    
        if (typeof lote.cantidad_aves !== 'undefined') {
            // Actualizar la cantidad de aves en función del tipo de novedad
            if (nuevaNovedad.id_tipo_novedad === 4) {
                lote.cantidad_aves = lote.cantidad_aves + nuevaNovedad.cantidad;
            } else {
                lote.cantidad_aves = lote.cantidad_aves - nuevaNovedad.cantidad;
            }
        } else {
            return resp.status(400).send('Error en la petición: Propiedad cantidad_aves no encontrada en el lote');
        }


        if (!lote) {
            return resp.status(400).send('Error en la petición: Lote no encontrado');
        }

        if (nuevaNovedad.id_tipo_novedad === 4) {
            lote.cantidad_aves = lote.cantidad_aves + nuevaNovedad.cantidad; // Sumar cantidad de aves
        } else {
            lote.cantidad_aves = lote.cantidad_aves - nuevaNovedad.cantidad; // Restar cantidad de aves
        }

        bdn.push(nuevaNovedad);


        fs.writeFileSync('./public/bd/novedad.json', JSON.stringify(bdn, null, 2))
        fs.writeFileSync('./public/bd/lote.json', JSON.stringify(bdlote, null, 2))


        resp.status(201).json(nuevaNovedad);


    }catch (error) {
                // Capturar y manejar cualquier error que ocurra durante la inserción
                console.error('Error al agregar la novedad:', error.message);
                resp.status(500).send('Error al agregar la novedad');
            }
})

module.exports = noveRouter;


