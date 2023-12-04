import express from "express";
import morgan from "morgan";
import chalk from "chalk";

import apiRoutes from "./routers/routes.js";
import db from "./backend/database/db.js";

import frontendRoutes from "./frontend/routes.js";

process.on('uncaughtException', (e) => {
    console.log(chalk.red(e.message));
});
process.on('unhandledRejection', (e) => {
    console.log(chalk.red(e.message));
});

db.configure();

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(frontendRoutes);
app.use('/api', apiRoutes);

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
    console.log(chalk.gray('Application runnin at: '), chalk.greenBright(`http://localhost:${port}`));
});
