
import { Router } from 'express';
import express from 'express';
import { UserControler } from '../controllers/user.controller.js';
import UsersRepository from '../database/user.repository.js';
import chalk from 'chalk';
import UpdateUserCmd from '../cmd/update-user.cmd.js';
import CreateUserCmd from '../cmd/create-user.cmd.js';

/**
 * @returns UsersRepository
 */
function getUserController() {
    const repo = new UsersRepository();
    return new UserControler(repo);
}

/**
 * @param {express.Request<CreateUserCmd>} req 
 * @param {express.Response} res 
 */
export async function createUserHandler(req, res) {
    const userCreateData = req.body;
    const userController = getUserController();
    try {
        const idOrErrors = await userController.create(userCreateData);
        if (typeof idOrErrors == 'number') {
            return res.status(201).json({ id: idOrErrors });
        }
        return res.status(400).json({ errors: idOrErrors });
    } catch (error) {
        console.error(chalk.red(error?.message || error));
        return res.status(500).json({ errors: 'Algum erro inesperado ocorreu' });
    }
}

/**
 * @param {express.Request<UpdateUserCmd>} req 
 * @param {express.Response} res 
 */
export async function updateUserHandler(req, res) {
    const id = req.params['id'];
    const userUpdateData = req.body;
    userUpdateData.id = id;
    const userController = getUserController();
    try {
        const errors = await userController.update(userUpdateData);
        if (errors != null) {
            return res.status(200).json({ message: 'Atualizado com sucesso!' });
        }
        return res.status(400).json({ errors: idOrErrors });
    } catch (error) {
        console.error(chalk.red(error?.message || error));
        return res.status(500).json({ errors: 'Algum erro inesperado ocorreu' });
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function getUserHandler(req, res) {
    const id = req.params['id'];
    const userController = getUserController();
    try {
        const user = await userController.findOne({ id });
        if (user != null) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ errors: 'Não foi encontrado nada!' });
    } catch (error) {
        console.error(chalk.red(error?.message || error));
        return res.status(500).json({ errors: 'Algum erro inesperado ocorreu' });
    }
}
