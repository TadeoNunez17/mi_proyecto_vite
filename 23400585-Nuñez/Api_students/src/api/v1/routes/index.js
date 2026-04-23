import { Router } from 'express';
import config from '../../../config/config.js';

// Import Routes
import prodServRoutes from './prodServ.routes.js';
import institutoRoutes from './instituto.routes.js';

const routerAPI = (app) => {
    const router = Router();
    const api = config.API_URL;

    app.use(api, router);

    // Rutas
    router.use('/prodserv', prodServRoutes);
    router.use('/institutos', institutoRoutes);

    return router;
};

export default routerAPI;