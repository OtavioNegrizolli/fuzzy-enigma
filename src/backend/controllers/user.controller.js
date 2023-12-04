import User from '../models/user.model.js';
import CreateUserCmd from '../cmd/create-user.cmd.js';
import UpdateUserCmd from '../cmd/update-user.cmd.js';
import DeleteUserCmd from '../cmd/delete-user.cmd.js';

import SingleUserQuery from '../cmd/delete-user.cmd.js';

import { validateUser } from '../helpers/validators/user-validator.js';

import UsersRepository from '../database/user.repository.js';
import bcrypt from 'bcrypt';


export class UserControler {
    /** @type UsersRepository */
    #repository;
    /**
     * @param {UsersRepository} userRepository 
     */
    constructor(userRepository) {
        this.#repository = userRepository;
    }
    /**
     * @param {CreateUserCmd} userCreateData 
     * @returns {Promise<number|{[key:string]: string}>} created user id ou uma lista de erros
     */
    async create(userCreateData) {
        // parse
        const user = new User({
            name: userCreateData.name,
            document: userCreateData.document,
            phone: userCreateData.phone,
            email: userCreateData.email,
            zip_code: userCreateData.zip_code,
            state: userCreateData.street,
            city: userCreateData.city,
            neighborhood: userCreateData.neighborhood,
            street: userCreateData.street,
            number: userCreateData.number,
            complement: userCreateData.complement,
            birthDate: new Date(Date.parse(userCreateData.birthDate)),
            password: bcrypt.hashSync(userCreateData.password, 10),
            login: userCreateData.login,
            aboutMe: userCreateData.aboutMe
        });

        // validation
        let errors = validateUser(user);
        if (userCreateData.password != userCreateData.passwordConfirmation) {
            errors = errors || {};
            errors['password'] = 'As senhas não são iguais';
        }
        if (errors != null) return errors;

        // inserção
        try {
            const id = await this.#repository.insert(user);
            return id;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * @param {UpdateUserCmd} userUpdateData 
     * @returns {Promise<null|{[key:string]: string}>} nada ou uma lista com os erros de validação
     */
    async update(userUpdateData) {
        // virifica exitência
        const user = await this.#repository.findById(userUpdateData.id);
        if (user == null)
            return { 'user': 'Não foi encontrado o usuário informado' };

        // atualiza os dados
        this.#updateData(user, userUpdateData);

        // validation
        let errors = validateUser(user);
        if (userUpdateData.password != null && userUpdateData.password != userUpdateData.passwordConfirmation) {
            errors = errors || {};
            errors['password'] = 'As senhas não são iguais';
        }

        if (errors != null) return errors;

        // salva
        try {
            await this.#repository.update(user);
            return null;
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * @param {DeleteUserCmd} userDeleteData 
     * @returns {Promise<void>} 
     */
    async delete(userDeleteData) {
        // exclusão
        try {
            await this.#repository.delete(userDeleteData.id);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * @param {SingleUserQuery} toFindData 
     * @returns {Promise<User>} 
    */
    async findOne(toFindData) {
        if (toFindData == null) return null;

        // exclusão
        try {
            const user = await this.#repository.findById(toFindData.id);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    /** 
     * @param {User} user 
     * @param {UpdateUserCmd} userUpdateData 
     */
    #updateData(user, userUpdateData) {
        user.name = userUpdateData.name;
        user.document = userUpdateData.document;
        if (userUpdateData.password != null)
            user.password = bcrypt.hashSync(userUpdateData.password, 10);
        user.birthDate = new Date(Date.parse(userUpdateData.birthDate));
        user.phone = userUpdateData.phone;
        user.email = userUpdateData.email;
        user.zipCode = userUpdateData.zip_code;
        user.state = userUpdateData.state;
        user.city = userUpdateData.city;
        user.neighborhood = userUpdateData.neighborhood;
        user.street = userUpdateData.street;
        user.number = userUpdateData.number;
        user.complement = userUpdateData.complement;
        user.aboutMe = userUpdateData.aboutMe;
    }
}
