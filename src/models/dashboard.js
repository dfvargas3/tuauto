const pool = require('../database');

async function listAll(req){
    const vehiculo = await pool.query('select v.id as id, v.tipo as tipo, v.placa as placa, v.color as color, '+
            'v.observaciones as observaciones, m.nombre as marca, v.alias as alias '+
            'from vehiculo as v, marca as m '+
            'where v.id_marca = m.id ');
    return vehiculo;
}

module.exports = {listAll};