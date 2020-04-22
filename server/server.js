require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get('/usuarios', (req, res) => {
    res.json('get Usuarioss');
});

app.post('/usuarios', (req, res) => {

    let body = req.body;

    if(body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
});

app.put('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    res.json({
        id: id
    });
});

app.delete('/usuarios', (req, res) => {
    res.json('delete Usuarioss');
});

app.listen(PORT, () => {
    console.log('Escuchando del puerto: ' + PORT);
});