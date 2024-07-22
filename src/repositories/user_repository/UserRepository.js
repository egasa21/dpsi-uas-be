class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async findUserById(id) {
        return await this.UserModel.findByPk(id);
    }
}

module.exports = UserRepository;