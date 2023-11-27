import User from '../models/user.model.js';
import { validateUser } from '../helpers/validators/user-validator.js';
//insert into users(name, phone, email, zip_code, state, city, neighborhood,street, number, complement, birth_date, password) values (\
//'first', '11997211243', 'frist@test.com', '01001000', 'SP', 'Sao Paulo', 'Se', 'Praca da Se', '5001', 'Lado impar', '20-12-2003', '$2y$10$k4K6kFmBErzcTUoFh43F1ugzf15HKy6osBm1yikc34T7lVXp7/z7m');
export class UserControler {

    #repository;
    constructor(userRepository) {
        this.#repository = userRepository;
    }

    async create(userCreateData) {
        // parse
        const user = new User(userCreateData);
        // validation
        const errors = validateUser(user);
        if (errors != null)
            return errors;

        try {
            await this.#repository.insert(user);
            return user;
        }
        catch (e) {
            throw e;
        }
    }
}
