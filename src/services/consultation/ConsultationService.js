const NotFoundError = require("../../exception/NotFoundError");

class ConsultationService {
    constructor(consultationRepository) {
        this.consultationRepository = consultationRepository;

    }

    async create(data) {
        return this.consultationRepository.create(data);
    }

    async findById(id) {
        return this.consultationRepository.findById(id);
    }

    async findAll() {
        return this.consultationRepository.findAll();
    }

    async update(id, data) {
        try {
            return await this.consultationRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Consultation not found!");
            } else {
                throw new Error(`Error while updating consultation: ${e.message}`);
            }
        }
    }

    async delete(id) {
        try {
            return await this.consultationRepository.deleteById(id);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Consultation not found!");
            } else {
                throw new Error(`Error while deleting consultation: ${e.message}`);
            }
        }
    }
}

module.exports = ConsultationService;
