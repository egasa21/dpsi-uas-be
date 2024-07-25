const NotFoundError = require("../../exception/NotFoundError");

class PetShopRepository {
    constructor(PetShopModel, sequelize) {
        this.PetShopModel = PetShopModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.PetShopModel.create(data);
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();
        try {
            const petShop = await this.PetShopModel.findByPk(id, {transaction});
            if (!petShop) {
                throw new NotFoundError('PetShop not found');
            }

            const updatedPetShop = await petShop.update(data, {transaction});
            await transaction.commit();

            return updatedPetShop;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async findById(id) {
        try {
            return await this.PetShopModel.findByPk(id)
        } catch (e) {
            throw e;
        }
    }

    async findAll() {
        try {
            return await this.PetShopModel.findAll()
        } catch (e) {
            throw e;
        }
    }

    async deleteById(id) {
        try {
            const petShop = await this.findById(id)
            if (!petShop) {
                throw new NotFoundError('PetShop not found');
            }
            return await petShop.destroy()
        } catch (e) {
            throw e;
        }
    }
}


module.exports = PetShopRepository;