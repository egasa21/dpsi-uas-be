const NotFoundError = require("../../exception/NotFoundError")

class OpeningHoursRepository {
    constructor(OpeningHoursModel, sequelize) {
        this.OpeningHoursModel = OpeningHoursModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.OpeningHoursModel.create(data);
    }

    async findById(id) {
        return this.OpeningHoursModel.findByPk(id);
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();
        try {
            const openingHour = await this.OpeningHoursModel.findByPk(id, {transaction});
            if (!openingHour) {
                throw new NotFoundError('Opening hour not found');
            }

            const updatedOpeningHour = await openingHour.update(data, {transaction});
            await transaction.commit();

            return updatedOpeningHour;
        } catch (e) {
            await transaction.rollback()
            throw e;
        }
    }

    async findAll() {
        return await this.OpeningHoursModel.findAll()
    }

    async deleteOne(id) {
        const petShop = await this.OpeningHoursModel.findByPk(id);
        if (!petShop) {
            throw new NotFoundError('PetShop not found');
        }

        return await petShop.destroy()
    }
}


module.exports = OpeningHoursRepository;