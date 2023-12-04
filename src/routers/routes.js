import { Router } from "express";

import {
    createUserHandler,
    updateUserHandler,
    getUserHandler
} from "../backend/routes/users.routes.js";

const apiRoutes = Router();

apiRoutes.use('/health', (_, res) => {
    return res.status(200).json({ health: 'Alive!' });
});

apiRoutes.route('/user')
    .post(createUserHandler)
apiRoutes.route('/user/:id')
    .put(updateUserHandler)
    .patch(updateUserHandler)
    .get(getUserHandler);

export default apiRoutes;
