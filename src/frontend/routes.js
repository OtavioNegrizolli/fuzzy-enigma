import express from "express";

const frontendRoutes = express.Router();

frontendRoutes.use(express.static('src/frontend/public'));
frontendRoutes.use(express.static('src/frontend/pages/private'));
frontendRoutes.use(express.static('src/frontend/pages/public'));

export default frontendRoutes;
