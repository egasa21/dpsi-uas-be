const NotFoundError = require("../../exception/NotFoundError");

class TreatmentRepository {
    constructor(TreatmentModel, sequelize) {
        this.TreatmentModel = TreatmentModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.TreatmentModel.create(data);
    }

    async findById(id) {
        const treatment = await this.TreatmentModel.findByPk(id);
        if (!treatment) {
            throw new NotFoundError('Treatment not found');
        }
        return treatment;
    }

    async findAll() {
        return this.TreatmentModel.findAll();
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();
        try {
            const treatment = await this.TreatmentModel.findByPk(id, { transaction });
            if (!treatment) {
                throw new NotFoundError('Treatment not found');
            }

            const updatedTreatment = await treatment.update(data, { transaction });
            await transaction.commit();

            return updatedTreatment;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async deleteById(id) {
        const treatment = await this.TreatmentModel.findByPk(id);
        if (!treatment) {
            throw new NotFoundError('Treatment not found');
        }

        return treatment.destroy();
    }
}

module.exports = TreatmentRepository;
