import { Router } from "express";
import express from "express";

const routes = Router();

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function getProduct(req, res) {
    const productId = req.params.id;
    return res.json({
        id: productId,
        name: 'Banana',
        subcategory: 'Fruta',
        category: 'Food'
    });
}

routes.get('/product/:id', getProduct);

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function getProducts(req, res) {
    const r = req.query;
    return res.json([
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
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function create(req, res) {
    return res.status(201).json({
        ok: 'nice'
    });
}
routes.post('/product', create);


routes.use(express.static('src/pages/private'));
routes.use(express.static('src/public'));
export default routes;
