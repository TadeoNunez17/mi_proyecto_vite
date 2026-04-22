import mongoose from 'mongoose';
import config from './config.js'; 
export default mongoose;
 (async () => { 
    try { 
        // ... dentro del try en database.config.js
console.log('Intentando conectar a:', config.CONNECTION_STRING); // <-- Agrega esto
const db = await mongoose.connect(config.CONNECTION_STRING, { 
    dbName: config.DATABASE 
}); 
console.log('✅ Database is connected to: ', db.connection.name);
    } catch (error) {
console.log('❌ Error de conexión: ', error);
        } 
})();