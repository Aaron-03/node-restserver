const jwt = require('jsonwebtoken');

// ======================
// Verificar Token
// ======================
const verificaToken = (req, res, next) => {

    const token = req.get('token');

    // res.json({
    //     token: token
    // });

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

const verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok:false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdminRole
}