import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routeAPI from './api/v1/routes/index.js';

// FIC: Config para variables de entorno
import config from './config/config.js';

//  Establece la conexion a la BD
import './config/database.config.js'; // Esto ejecuta el archivo sin importar variables
const app = express();

// FIC: Settings
app.set('port', config.PORT);

// FIC: Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// FIC: Routes base
const api = config.API_URL;

app.get(`${api}`, (req, res) => {
    res.send(
        `<h1>RESTful running in root</h1> <p> eEducation: <b>${api}/api-docs</b> for more information.</p>`
    );
});

app.get('/DrFIC', (req, res) => {
    res.send(
        `<h1>RESTful running in ?</h1> <p> eEducation: <b>${api}/api-docs</b> for more information.</p>`
    );
});

// 🔥 IMPORTANTE (esto es lo nuevo del 6.4)
routeAPI(app);

export default app;