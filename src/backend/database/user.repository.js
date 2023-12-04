import User from "../models/user.model.js";
import mysql from "mysql2/promise";

const INSERT_QUERY = `INSERT INTO persons
        (login, name, password, document, birth_date, phone, email, postal_code, state, city, neighborhood, street, house_number, complement, about_me)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const UPDATE_QUERY = `UPDATE persons
        SET login=?, name=?, password=?, 
            document=?, birth_date=?, phone=?, 
            email=?, postal_code=?, state=?, 
            city=?, neighborhood=?, street=?, 
            house_number=?, complement=?, about_me=?
        WHERE id=?`;
const SELECT_QUERY = `SELECT id, 
    login, name, password, document, birth_date, phone, email, postal_code, state, city, neighborhood, street, house_number, complement, about_me
        FROM persons`;

const DELETE_QUERY = 'DELETE FROM persons WHERE id=?'

export default class UsersRepository {
    /** @type {mysql.Pool} */
    #db;
    constructor() {
        this.#db = global.dbPool;
    }
    /**
     * @description inserts a user into the database and returns the generated id
     * @param {User} user 
     * @returns {Promise<number>}
     */
    async insert(user) {

        if (user == null)
            throw new Error('Usuário vazio');

        const params = [
            user.login,
            user.name,
            user.password,
            user.document,
            user.birthDate,
            user.phone,
            user.email,
            user.zipCode,
            user.state,
            user.city,
            user.neighborhood,
            user.street,
            user.number,
            user.complement,
            user.aboutMe
        ];

        try {
            const [result,] = await this.#db.execute(INSERT_QUERY, params);
            return result.insertId;
        } catch (error) {
            throw new Error('Falha durante a inserção do registro');
        }
    }

    /**
     * @param {User} user 
     * @returns {Promise<void>}
     * @throws Error
     */
    async udpate(user) {
        if (user == null)
            throw new Error('Usuário vazio');

        const params = [
            user.login,
            user.name,
            user.password,
            user.document,
            user.birthDate,
            user.phone,
            user.email,
            user.zipCode,
            user.state,
            user.city,
            user.neighborhood,
            user.street,
            user.number,
            user.complement,
            user.aboutMe,
            user.id
        ];

        try {
            await this.#db.execute(UPDATE_QUERY, params);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {number} userId
     * @returns {Promise<User|null>}
     * @throws Error
     */
    async findById(userId) {
        const params = [userId];
        const _select = SELECT_QUERY + ' where id = ?';
        try {
            const res = await this.#db.execute(_select, params);
            if (res != null && res[0] != null && res[0][0]) {
                const result = res[0][0];
                return new User({
                    id: result.id,
                    login: result.login,
                    name: result.name,
                    password: result.password,
                    document: result.document,
                    birthDate: result.birth_date,
                    phone: result.phone,
                    email: result.email,
                    zip_code: result.postal_code,
                    state: result.state,
                    city: result.city,
                    neighborhood: result.neighborhood,
                    street: result.street,
                    number: result.house_number,
                    complement: result.complement,
                    aboutMe: result.about_me
                });
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {number} userId
     * @returns {Promise<void>}
     * @throws Error
     */
    async delete(userId) {
        if (userId != null) {

            try {
                const params = [userId];
                await db.execute(DELETE_QUERY, params);
            }
            catch (e) {
                throw e;
            }
        }
    }
}
