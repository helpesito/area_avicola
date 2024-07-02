const express = require('express')
const bdlote = require('../../public/bd/lote.json'),
        bdl = require('../../public/bd/lotes.json'),
        bdave = require('../../public/bd/ave.json')



const loteRouter = express.Router()

loteRouter.get('/api/lote', async (req, resp)=>{
    try{
        const lote = bdlote.map(lote =>{
            const numeroLote = bdl.find(n => n.id_lotes === lote.id_lotes)
            const ave = bdave.find(a => a.id_ave === lote.id_ave)

            return{
                id_lote: lote.id_lote,
                numero_lote: numeroLote.nro_lote,
                ave: ave.tipo_ave,
                fecha_ingreso: lote.fecha_ingreso,
                cantidad_aves: lote.cantidad_aves,
                edad: lote.edad
            }
        })
        console.log(lote)

        resp.send(lote)
    }catch (error) {
        console.error(error);
        resp.status(500).send('Error al obtener el lote');
    }
})





module.exports = loteRouter