import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.HOST || 'NO ENCONTRE VARIABLE DE ENTORNO',
    PORT: process.env.PORT || 'NO ENCONTRE PORT',
    API_URL: process.env.API_URL || '/api/v1',
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'mongodb://Equipo%205:12345@localhost:27017/db_education?authSource=db_education',
    DATABASE: process.env.DATABASE || 'db_default',
    DB_USER: process.env.DB_USER || 'admin',
    DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
};