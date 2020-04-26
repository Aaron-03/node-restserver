const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const { verificaToken, verificaTokenImg } = require('../middlewares/autenticacion');


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    const noImagePath = path.resolve(__dirname, '../assets/hobbies.png');

    if(fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        res.sendFile(noImagePath);
    }

});













module.exports = app;