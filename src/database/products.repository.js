import { Product } from "../entities/index.js";

export default class ProductsRepository {
    #db;
    constructor() {
        this.#db = global.dbPool;
    }

    /** @param {Product} product the product to create into the database */
    async add(product) {
        if (!(product instanceof Product))
            throw new Error('The paramater passed to ProductsRepository.add is not a valid product');
        try {
            const queryExecutionData = await this.#db.executeNonQuery(
                'INSERT INTO Product(description, meauserement_unit, subcategory_id) VALUES (:description, :unit, :subcategory);',
                {
                    description: product.description,
                    unit: product.measurementUnit,
                    subcategory: 10000 // até segunda ordem 
                }
            );
            return queryExecutionData.returnId;
        } catch (error) {
            throw new Error(`Erro while executing the insert at ProductsRepository.add\n\t${error.message}`);
        }
    }
    /** @param {Product} product the product to create into the database */
    async update(product) {
        if (!(product instanceof Product))
            throw new Error('The paramater passed to ProductsRepository.add is not a valid product');

        try {
            await this.#db.executeNonQuery(
                'UPDATE Product SET description = :description, meauserement_unit = :unit, subcategory_id = :subcategory WHERE id = :id;',
                {
                    description: product.description,
                    unit: product.measurementUnit,
                    subcategory: 10000,
                    id: product.id
                }
            );
        }
        catch (error) {
            throw new Error(`Error while updating the product\n${error.message}`)
        }
    }

    async delete(product) {
        if (!(product instanceof Product))
            throw new Error('The paramater passed to ProductsRepository.add is not a valid product');
        try {
            await this.#db.executeNonQuery('DELETE FROM Product WHERE id = ?;', [product.id]);
        }
        catch (error) {
            throw new Error(`Error while deleting the product\n${error.message}`);
        }
    }

    async getById(id) {
        try {
            const data = await this.#db.executeQuery('SELECT id, description, meauserement_unit, subcategory_id FROM Product WHERE id = ?;', [id]);
            return data;
        }
        catch (error) {
            throw new Error(`Error while searching for a product\n${error.message}`);
        }
    }

    async get({ description, subcategory, pagination, orderBy }) {

        if (pagination == null)
            pagination = { limit: 20, skip: 0 };

        let sql = 'SELECT id, description, meauserement_unit, subcategory_id FROM Product WHERE 1';
        const params = {};
        if (description) {
            sql += ` AND description LIKE CONCAT('%', :description, '%')`;
            params.description = description;
        }
        if (subcategory) {
            sql += 'AND subcategoria_id = :subcategoria'
            params.subcategory = subcategory;
        }

        if (orderBy != null) {
            sql += ' ORDER BY '
            if (Array.isArray(orderBy)) {
                slq += orderBy.join(', ');
            }
            if (typeof orderBy === 'string')
                sql += orderBy;
        }

        sql += ` LIMIT ${pagination.limit} OFFSET ${pagination.skip}`;
        try {
            await this.#db.executeNonQuery(sql, params);
        } catch (error) {

            throw new Error(`Error while searching for products\n${error.message}`);
        }
    }

}
