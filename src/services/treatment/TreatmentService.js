const NotFoundError = require("../../exception/NotFoundError");

class TreatmentService {
    constructor(treatmentRepository) {
        this.treatmentRepository = treatmentRepository;
    }

    async create(data) {
        return this.treatmentRepository.create(data);
    }

    async findById(id) {
        return this.treatmentRepository.findById(id);
    }

    async findAll() {
        return this.treatmentRepository.findAll();
    }

    async update(id, data) {
        try {
            return await this.treatmentRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Treatment not found!");
            } else {
                throw new Error(`Error while updating treatment: ${e.message}`);
            }
        }
    }

    async delete(id) {
        try {
            return await this.treatmentRepository.deleteById(id);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Treatment not found!");
            } else {
                throw new Error(`Error while deleting treatment: ${e.message}`);
            }
        }
    }
}

module.exports = TreatmentService;
