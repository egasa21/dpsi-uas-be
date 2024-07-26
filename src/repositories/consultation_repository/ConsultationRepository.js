const NotFoundError = require("../../exception/NotFoundError");

class ConsultationRepository {
    constructor(ConsultationModel, sequelize) {
        this.ConsultationModel = ConsultationModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.ConsultationModel.create(data);
    }

    async findById(id) {
        const consultation = await this.ConsultationModel.findByPk(id);
        if (!consultation) {
            throw new NotFoundError('Consultation not found');
        }
        return consultation;
    }

    async findAll() {
        return this.ConsultationModel.findAll();
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();
        try {
            const consultation = await this.ConsultationModel.findByPk(id, { transaction });
            if (!consultation) {
                throw new NotFoundError('Consultation not found');
            }

            const updatedConsultation = await consultation.update(data, { transaction });
            await transaction.commit();

            return updatedConsultation;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async deleteById(id) {
        const consultation = await this.ConsultationModel.findByPk(id);
        if (!consultation) {
            throw new NotFoundError('Consultation not found');
        }

        return consultation.destroy();
    }
}

module.exports = ConsultationRepository;
