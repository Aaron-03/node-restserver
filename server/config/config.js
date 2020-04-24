// =======================================
// Puerto
// =======================================
process.env.PORT = process.env.PORT || 3000;


// =======================================
// Entorno
// =======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =======================================
// Base de Datos
// =======================================
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://root:root123@cluster0-zlwyx.mongodb.net/Cafe';
}

process.env.URLDB = urlDB;

