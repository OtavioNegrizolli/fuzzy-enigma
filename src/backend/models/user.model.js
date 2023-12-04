import bctypt from 'bcrypt';

//insert into users(name, phone, email, zip_code, state, city, neighborhood,street, number, complement, birth_date, password) values (\
//'first', '11997211243', 'frist@test.com', '01001000', 'SP', 'Sao Paulo', 'Se', 'Praca da Se', '5001', 'Lado impar', '20-12-2003', '$2y$10$k4K6kFmBErzcTUoFh43F1ugzf15HKy6osBm1yikc34T7lVXp7/z7m');

export default class User {
    #id;
    #name;
    #document;
    #phone;
    #email;
    #zip_code;
    #state;
    #city;
    #neighborhood;
    #street;
    #number;
    #complement;
    #birthDate;
    #password;
    #login;
    #aboutMe;
    /**
     * @param {{name:string,document:string,phone:string,email:string,zip_code:string,state:string,city:string,neighborhood:string,street:string,number:string,complement:string,birthDate:Date,password:string,login:string,aboutMe:string, id?:number}} userData
     */
    constructor({
        name,
        document,
        phone,
        email,
        zip_code,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
        birthDate,
        password,
        login,
        aboutMe, 
        id = null
    }) {
        this.#id = id;
        this.#name = name.replace(/[\W_]/, '');
        this.#document = document.replace(/[\D]/ig, '');
        this.#phone = phone.replace(/[\D]/ig, '');
        this.#email = email;
        this.#zip_code = zip_code.replace(/[\D]/ig, '');
        this.#state = state;
        this.#city = city;
        this.#neighborhood = neighborhood;
        this.#street = street;
        this.#number = number;
        this.#complement = complement || null;
        this.#birthDate = birthDate;
        this.#password = password;
        this.#login = login;
        this.#aboutMe = aboutMe || null;
    }

    /** @returns {number} */
    get id() {
        return this.#id;
    }
    /** 
     * @description insert a id if there is none
     * @param {number} newId 
     * */
    set id(newId) {
        this.#id = this.#id || newId;
    }
    /**@returns {string} the user name */
    get name() {
        return this.#name;
    }
    /** @param {string} newName */
    set name(newName) {
        this.#name = newName.replace(/[\W_]/ig, '');
    }
    /**@returns {string} the user name */
    get document() {
        return this.#document;
    }
    /** @param {string} newDocument */
    set document(newDocument) {
        this.#document = newDocument.replace(/[\D]/ig, '');
    }
    /**@returns {string} the user phone number */
    get phone() {
        return this.#phone;
    }
    /** @param {string} newPhone */
    set phone(newPhone) {
        this.#phone = newPhone.replace(/[\D]/ig, '');
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
        this.#zip_code = newZipCode.replace(/[\D]/ig, '');
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
    /** @returns {Date} */
    get birthDate() {
        return this.#birthDate;
    }
    /** @param {Date} newBirthDate */
    set birthDate(newBirthDate) {
        this.#birthDate = newBirthDate;
    }
    /** @returns {string} the user password */
    get password() {
        return this.#password;
    }
    /** @param {string} newPassword */
    set password(newPassword) {
        this.#password = newPassword;
    }
    /** @returns {string} the user login */
    get login() {
        return this.#login;
    }
    /** @param {string} bio */
    set aboutMe(bio) {
        this.#aboutMe = bio;
    }
    /** @returns {string} the user shor biography */
    get aboutMe() {
        return this.#aboutMe;
    }
}
