// =======================================
// Puerto
// =======================================
process.env.PORT = process.env.PORT || 3000;


// =======================================
// Entorno
// =======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =======================================
// Vencimiento del Token
// =======================================
process.env.CADUCIDAD_TOKEN = '48h';

// =======================================
// SEED de autenticación
// =======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =======================================
// Base de Datos
// =======================================
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;

// =======================================
// Google Client ID
// =======================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '729082175022-l8toq61jljdu8rvi5bq60ktomes4293f.apps.googleusercontent.com';