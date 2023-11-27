

export default class UsersRepository {
    #db;
    constructor() {
        this.#db = global.dbPool;
    }
}
