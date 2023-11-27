import User from "../../models/user.model.js";


/**
 * @description Validate a given user
 * @param {User} user the user to be validated
 * @returns {string[]|null} a list with erros or null
 */
export function validateUser(user) {
    if (user == undefined) {
        return ['nenhum dado foi fornecido para criação do usuário'];
    }
    const errors = [];
    validateUserName(user.name, errors);
    validateUserPhone(user.phone, errors);
    validateUserEmail(user.email, errors);
    validateUserZipCode(user.zipCode, errors);
    validateUserState(user.state, errors);
    validateUserCity(user.city, errors);

    if (user.neighborhood) {

    }
    if (user.street) {

    }
    if (user.number) {

    }
    if (user.complement) {

    }
    if (user.birth_date) {

    }
    if (user.password) {

    }

}

const NAME_MIN_LENGTH = 10;
const NAME_MAX_LENGTH = 50;
/**
 * 
 * @param {string} name 
 * @param {string[]} errors error list to apend errors to
 */
function validateUserName(name, errors) {
    if (name == null) {
        errors.push('Precisa fornecer um nome para o usuário');
    } else if (name.length < NAME_MIN_LENGTH) {
        errors.push(`Nome muito curto, mínimo de ${NAME_MIN_LENGTH} caracteres`);
    }
    else if (name.length > NAME_MAX_LENGTH) {
        errors.push(`Nome muito longo, máximo de ${NAME_MAX_LENGTH} caracteres`);
    }
}

const PHONE_MIN_LENGTH = 11;
const PHONE_MAX_LENGTH = 10;
/**
 * 
 * @param {string} phone 
 * @param {string[]} errors error list to apend errors to
 */
function validateUserPhone(phone, errors) {
    if (phone == null) {
        errors.push('Precisa fornecer um telefone para o usuário');
    } else if (phone.length < PHONE_MIN_LENGTH || phone.length > PHONE_MAX_LENGTH) {
        errors.push(`Telefone precisa deve seguir o formato (XX) XXXX-XXXX ou (XX) X XXXX-XXXX`);
    }
}

const MAIL_REGEX = /^[a-z](\w*([-\.]\w)?)+(\+[\w]+)?@([\w-]+\.)+[\w-]{2,4}$/gi;
/**
 * 
 * @param {string} email 
 * @param {string[]} errors error list to apend errors to
 */
function validateUserEmail(email, errors) {
    if (email == null) {
        errors.push('O e-mail é obrigatório');
    } else if (MAIL_REGEX.test(email)) {
        errors.push('E-mail está em um formato inválido');
    }
}

const POSTAL_CODE_LENGHT = 8;
/**
 * 
 * @param {string} zipcode 
 * @param {string[]} errors error list to apend errors to
 */
function validateUserZipCode(zipcode, errors) {
    if (zipcode == null) {
        errors.push('O CEP é obrigatório');
    }
    else if (zipcode.length != POSTAL_CODE_LENGHT) {
        errors.push(`CEP inválido, o CEP deve conter ${POSTAL_CODE_LENGHT} digitos`)
    }
}

const BRAZILIAN_UFS = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MG', 'MT', 'MS', 'PA', 'PB', 'PI', 'PR', 'PE', 'RJ', 'RO',
    'RR', 'RN', 'RS', 'SC', 'SE', 'SP', 'TO'
];
/**
 * 
 * @param {string} state 
 * @param {string[]} errors error list to apend errors to
 */
function validateUserState(state, errors) {
    if (state == null) {
        errors.push('A UF é obrigatória');
    }
    else if (BRAZILIAN_UFS.findIndex(uf => uf == state.toUpperCase()) > -1) {
        errors.push(`A UF informada não existe`);
    }
}

const CITY_NAME_MIN_LENGTH = 3;
const CITY_NAME_MAX_LENGTH = 29;
/**
 * 
 * @param {string} cityName
 * @param {string[]} errors error list to apend errors to
 */
function validateUserCity(cityName, errors) {
    if (cityName == null) {
        errors.push('A cidade é obrigatória');
    }
    else {
        cityName = cityName.replace(/\W/i, '');
        if (cityName.replace(/\W/i, '').length < CITY_NAME_MIN_LENGTH) {
            errors.push(`A cidade tem um nome muito curto`);
        }
        else if (cityName.replace(/\W/i, '').length > CITY_NAME_MAX_LENGTH) {
            errors.push(`A cidate tem um nome muito longo`);
        }
    }
}
