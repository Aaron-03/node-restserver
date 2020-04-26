const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

let Producto = require('../models/producto');


// =================================
// Obtener todos los productos
// =================================
app.get('/productos', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
        desde = Number(desde);

    Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate('categoria', 'descripcion')
    .populate('usuario', 'nombre email')
    .exec((err, productosDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos: productosDB
        });
    });
});

// =================================
// Obtener producto por ID
// =================================
app.get('/productos/:id', verificaToken, (req, res) => {

    const id = req.params.id;

    Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {


        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    
        if(!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }
    
        res.json({
            ok: true,
            producto: productoDB
        });
        
    });
    
});

// =================================
// Buscar productos
// =================================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    console.log(regex);

    Producto.find({ nombre: regex })
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: false,
            productos
        });
    });
});

// =================================
// Crear un nuevo producto
// =================================
app.post('/productos', verificaToken, (req, res) => {

    const body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        usuario: req.usuario._id,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});


// =================================
// Actualizar un producto por ID
// =================================
app.put('/productos/:id', verificaToken, (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Producto.findById(id, ( err, productoDB ) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoSave) => {

            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoSave
            });

        });
    });


});


// =================================
// Borrar un producto por ID
// =================================
app.delete('/productos/:id', verificaToken, (req, res) => {

    const id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoSave) => {

            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoSave,
                message: 'Producto Eliminado'
            });    

        });
        
    });

});




module.exports = app;