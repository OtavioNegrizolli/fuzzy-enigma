import express from "express";
import morgan from "morgan";
import routes from "./routers/routes.js";
import chalk from "chalk";
import configure from "./database/db.js";

process.on('uncaughtException', (e) => {
    console.log(chalk.red(e.message));
});
process.on('unhandledRejection', (e) => {
    console.log(chalk.red(e.message));
});

configure();

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
    console.log(chalk.gray('Application runnin at: '), chalk.greenBright(`http://localhost:${port}`));
});
