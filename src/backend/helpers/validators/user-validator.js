import User from "../../models/user.model.js";


/**
 * @description Validate a given user
 * @param {User} user the user to be validated
 * @returns {{[field:string]: string}|null} a list with erros or null
 */
export function validateUser(user) {
    if (user == undefined) {
        return ['nenhum dado foi fornecido para criação do usuário'];
    }
    const errors = {};
    validateUserName(user.name, errors);
    validateDocument(user.document, errors);
    validateUserPhone(user.phone, errors);
    validateUserEmail(user.email, errors);
    validateUserZipCode(user.zipCode, errors);
    validateUserState(user.state, errors);
    validateUserCity(user.city, errors);
    validateNeighborhood(user.neighborhood, errors);
    validateStreet(user.street, errors);
    validateNumber(user.number, errors);
    validateBirthDate(user.birthDate, errors);
    validateComplement(user.complement, errors);
    return Object.keys(errors.length).length > 0 ? errors : null;
}
//#region 
const NAME_MIN_LENGTH = 10;
const NAME_MAX_LENGTH = 50;
/**
 * 
 * @param {string} name 
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserName(name, errors) {
    if (name == null)
        errors['name'] = 'Obrigatório';
    else if (name.length < NAME_MIN_LENGTH)
        errors['name'] = `Mínimo ${NAME_MIN_LENGTH} caracteres`;
    else if (name.length > NAME_MAX_LENGTH)
        errors['name'] = `Máximo ${NAME_MAX_LENGTH} caracteres`;

}

const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 11;
/**
 * 
 * @param {string} phone 
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserPhone(phone, errors) {
    if (phone == null)
        errors['phone'] = 'Obrigatório';
    else if (phone.length < PHONE_MIN_LENGTH || phone.length > PHONE_MAX_LENGTH)
        errors['phone'] = `Inválido`;
}

const MAIL_REGEX = /^[a-z](\w*([-\.]\w)?)+(\+[\w]+)?@([\w-]+\.)+[\w-]{2,4}$/gi;
/**
 * 
 * @param {string} email 
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserEmail(email, errors) {
    if (email == null) {
        errors['email'] = 'Obrigatório';
    } else if (MAIL_REGEX.test(email)) {
        errors['email'] = 'Inválido';
    }
}

const POSTAL_CODE_LENGHT = 8;
/**
 * 
 * @param {string} zipcode 
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserZipCode(zipcode, errors) {
    if (zipcode == null) {
        errors['zipcode'] = 'Obrigatório';
    }
    else if (zipcode.length != POSTAL_CODE_LENGHT) {
        errors['zipcode'] = `Inválido`;
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
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserState(state, errors) {
    if (state == null) {
        errors['state'] = 'Obrigatória';
    }
    else if (BRAZILIAN_UFS.findIndex(uf => uf == state.toUpperCase()) > -1) {
        errors['state'] = `Inválida`;
    }
}

const CITY_NAME_MIN_LENGTH = 3;
const CITY_NAME_MAX_LENGTH = 29;
/**
 * 
 * @param {string} cityName
 * @param {{[field:string]: string}} errors error list to apend errors to
 */
function validateUserCity(cityName, errors) {
    if (cityName == null)
        errors['city'] = 'Obrigatória';
    else if (cityName.length < CITY_NAME_MIN_LENGTH)
        errors['city'] = `Mínimo ${CITY_NAME_MIN_LENGTH} letras`;
    else if (cityName.length > CITY_NAME_MAX_LENGTH)
        errors['city'] = `Máximo ${CITY_NAME_MAX_LENGTH} letras`;
}

const MIN_NEIGHBORHOOD_LENGTH = 3;
const MAX_NEIGHBORHOOD_LENGTH = 50;
/**
 * 
 * @param {string} neighborhood 
 * @param {{[field:string]: string}} errors 
 */
function validateNeighborhood(neighborhood, errors) {
    if (neighborhood == null)
        errors['neighborhood'] = 'Obrigatório';
    else if (neighborhood.length > MIN_NEIGHBORHOOD_LENGTH)
        errors['neighborhood'] = `Mínimo ${MIN_NEIGHBORHOOD_LENGTH} letras`;
    else if (neighborhood.length > MAX_NEIGHBORHOOD_LENGTH)
        errors['neighborhood'] = `Máximo ${MAX_NEIGHBORHOOD_LENGTH} letras`;
}

const MIN_STREET_LENGTH = 3;
const MAX_STREET_LENGTH = 50;
/**
 * @param {string} street 
 * @param {{[field:string]: string}} errors 
 */
function validateStreet(street, errors) {
    if (street == null)
        errors['street'] = 'Obrigatório';
    else if (street.length < MIN_STREET_LENGTH)
        errors['street'] = `Mínimo ${MIN_STREET_LENGTH} letras`;
    else if (street.length > MAX_STREET_LENGTH)
        errors['street'] = `Máximo ${MAX_STREET_LENGTH} letras`;
}
const MIN_NUMBER_LENGTH = 1;
const MAX_NUMBER_LENGTH = 10;
function validateNumber(number, errors) {
    if (number == null)
        errors['number'] = 'Obrigatório';
    else if (number.length < MIN_NUMBER_LENGTH)
        errors['number'] = `Mínimo ${MIN_NUMBER_LENGTH} caracters`;
    else if (number.length > MAX_NUMBER_LENGTH)
        errors['number'] = `Máximo ${MAX_NUMBER_LENGTH} caracters`;
}

/**
 * @param {Date} birthDate 
 * @param {{[field:string]: string}} errors 
 */
function validateBirthDate(birthDate, errors) {
    if (birthDate == null)
        errors['birthDate'] = 'Obrigatória';
    else if (new Date(birthDate).getTime() > new Date().getTime())
        errors['birthDate'] = 'Não pode ser posterior a hoje';
}
/**
 * @param {string} document 
 * @param {{[field:string]: string}} errors 
 */
function validateDocument(document, errors) {
    if (document == null)
        errors['document'] = 'Obrigatório';
    else if (validarCPF(document)) {
        errors['document'] = 'Inválido';
    }
}
const MAX_COMPLEMENT_LENGTH = 20;
/**
 * @param {string} complement 
 * @param {{[field:string]: string}} errors 
 */
function validateComplement(complement, errors) {
    if (complement != null && complement.length > MAX_COMPLEMENT_LENGTH) {
        errors['complement'] = `Máximo ${MAX_COMPLEMENT_LENGTH}`;
    }
}

/**
 * 
 * @param {string} cpf 
 * @returns {boolean} true se é valido e falso caso contrário
 */
function validarCPF(cpf) {
    if (cpf == null)
        return false;
    cpf = cpf.replace(/\D/ig, '');
    if (cpf.length != 11)
        return false;
    // coverte para numeros
    const cpfDigits = cpf.split('').map(c => Number(c));

    // virificando pelos falsos positivos conhecidos
    if (cpfDigits.every(d => d == cpfDigits[0]))
        return false;

    let sum = 0;
    for (let i = 0; i < 9; i++)
        sum += (10 - i) * cpfDigits[i];

    sum %= 11;
    const firstDigit = 11 - (sum > 2 ? sum : 11);
    if (firstDigit != cpfDigits[9])
        return false;

    sum = 0;
    for (let i = 0; i < 10; i++)
        sum += (11 - i) * cpfDigits[i];

    sum %= 11;
    const secondDigit = 11 - (sum > 2 ? sum : 11);

    return cpfDigits[10] == secondDigit;
}
//#endregion
