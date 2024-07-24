const NotFoundError = require("../../exception/NotFoundError");

class DoctorRepository {
    constructor(DoctorModel, sequelize) {
        this.DoctorModel = DoctorModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.DoctorModel.create(data);
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();

        try {
            const doctor = await this.DoctorModel.findByPk(id, {transaction})
            if (!doctor) {
                return new NotFoundError('Doctor not found');
            }
            const updatedDoctor = await doctor.update(data, {transaction});
            await transaction.commit();

            return updatedDoctor;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async findById(id) {
        try {
            return this.DoctorModel.findByPk(id)
        } catch (e) {
            throw e;
        }
    }

    async findAll() {
        try {
            return await this.DoctorModel.findAll()
        } catch (e) {
            throw e;
        }
    }
}

module.exports = DoctorRepository;