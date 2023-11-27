//insert into users(name, phone, email, zip_code, state, city, neighborhood,street, number, complement, birth_date, password) values (\
//'first', '11997211243', 'frist@test.com', '01001000', 'SP', 'Sao Paulo', 'Se', 'Praca da Se', '5001', 'Lado impar', '20-12-2003', '$2y$10$k4K6kFmBErzcTUoFh43F1ugzf15HKy6osBm1yikc34T7lVXp7/z7m');

export default class User {
    #id;
    #name;
    #phone;
    #email;
    #zip_code;
    #state;
    #city;
    #neighborhood;
    #street;
    #number;
    #complement;
    #birth_date;
    #password;

    constructor({
        name,
        phone,
        email,
        zip_code,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
        birth_date,
        password,
        id = null
    }) {
        this.#id = id;
        this.#name = name;
        this.#phone = phone;
        this.#email = email;
        this.#zip_code = zip_code;
        this.#state = state;
        this.#city = city;
        this.#neighborhood = neighborhood;
        this.#street = street;
        this.#number = number;
        this.#complement = complement;
        this.#birth_date = birth_date;
        this.#password = password;
    }


    get id() {
        return this.#id;
    }
    /** @param {number} newId */
    set id(newId) {
        this.#id = newId;
    }
    /**@returns {string} the user name */
    get name() {
        return this.#name;
    }
    /** @param {string} newName */
    set name(newName) {
        this.#name = newName;
    }
    /**@returns {string} the user phone number */
    get phone() {
        return this.#phone;
    }
    /** @param {string} newPhone */
    set phone(newPhone) {
        this.#phone = newPhone;
    }
    get email() {
        return this.#email;
    }
    /** @param {string} newEmail */
    set email(newEmail) {
        this.#email = newEmail;
    }
    get zipCode() {
        return this.#zip_code;
    }
    /** @param {string} newZipCode */
    set zipCode(newZipCode) {
        this.#zip_code = newZipCode;
    }
    get state() {
        return this.#state;
    }
    /** @param {string} newState */
    set state(newState) {
        this.#state = newState;
    }
    get city() {
        return this.#city;
    }
    /** @param {string} newCity */
    set city(newCity) {
        this.#city = newCity;
    }
    get neighborhood() {
        return this.#neighborhood;
    }
    /** @param {string} newNeighborhood */
    set neighborhood(newNeighborhood) {
        this.#neighborhood = newNeighborhood;
    }
    get street() {
        return this.#street;
    }
    /** @param {string} newStreet */
    set street(newStreet) {
        this.#street = newStreet;
    }
    get number() {
        return this.#number;
    }
    /** @param {string} newNumber */
    set number(newNumber) {
        this.#number = newNumber;
    }
    get complement() {
        return this.#complement;
    }
    /** @param {string} newComplement */
    set complement(newComplement) {
        this.#complement = newComplement;
    }
    get birthDate() {
        return this.#birth_date;
    }
    /** @param {Date} newBirthDate */
    set birthDate(newBirthDate) {
        this.#birth_date = newBirthDate;
    }
    get password() {
        return this.#password;
    }
    /** @param {string} newPassword */
    set password(newPassword) {
        this.#password = newPassword;
    }

}
