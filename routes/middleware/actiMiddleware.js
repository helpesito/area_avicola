const { v4: uuidv4 } = require('uuid');

const verificarCampos= (req, resp, next) =>{
    const { fecha, hora, id_lote, id_usuario, agua, huevos, alimento, id_vacuna } = req.body;

    if (!agua && !huevos && !alimento && !id_vacuna) {
        return resp.status(400).send('Debe ingresar al menos uno de los campos: agua, huevos, alimento o id_vacuna');
    }

    req.nuevaActividad = {
        id_actividad: uuidv4().substring(0, 8),
        fecha,
        hora,
        id_lote,
        id_usuario,
        agua,
        huevos,
        alimento,
        id_vacuna
    };

    next();

}

module.exports = verificarCampos;