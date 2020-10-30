'use strict'

const dashboard = require('../models/dashboard');

async function listAll (req = null){
    const listAll = await dashboard.listAll();
    return listAll;
}

module.exports = {listAll};