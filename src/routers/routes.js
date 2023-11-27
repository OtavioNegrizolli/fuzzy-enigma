import chalk from "chalk";
import { Router } from "express";

const routes = Router();

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getProduct(req, res) {
    const productId = req.params.id;
    return await res.json({
        id: productId,
        name: 'Banana',
        subcategory: 'Fruta',
        category: 'Food'
    });
}

routes.get('/product/:id', getProduct);

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getProducts(req, res) {
    const r = req.query;
    console.log(chalk.green(process.env.DB_PWD));
    return await res.json([
        {
            id: 123,
            name: 'Banana1',
            subcategory: 'Fruta',
            category: 'Food'
        },
        {
            id: 123,
            name: 'Banana2',
            subcategory: 'Fruta',
            category: 'Food'
        },
        {
            id: 123,
            name: 'Banana3',
            subcategory: 'Fruta',
            category: 'Food'
        },
    ]);
}

routes.get('/product', getProducts);

async function create(req, res) {
    console.log(chalk.green(JSON.stringify(req.body)));
    return await res.status(201).json({
        ok: 'nice'
    });
}
routes.post('/product', create);

export default routes;
