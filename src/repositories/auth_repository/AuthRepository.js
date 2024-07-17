const jwt = require('jsonwebtoken')

class AuthRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async create(data) {
        return this.UserModel.create(data);
    }

    async findUserByEmail(email) {
        return await this.UserModel.findOne({ where: { email } });
    }

}

module.exports = AuthRepository;