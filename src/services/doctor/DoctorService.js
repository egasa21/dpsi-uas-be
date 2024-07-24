const NotFoundError = require("../../exception/NotFoundError");

class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    async create(data) {
        try {
            return this.doctorRepository.create(data);
        } catch (e) {
            throw new Error("Failed to create Doctor");
        }
    }

    async update(id, data) {
        try {
            return await this.doctorRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Doctor not found!");
            } else {
                throw new Error("Error updating doctor")
            }
        }
    }

    async findById(id) {
        try {
            return await this.doctorRepository.findById(id);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Customer not found!");
            } else {
                throw new Error("Error while get customer")
            }
        }
    }

    async findAll() {
        try {
            return await this.doctorRepository.findAll()
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Customer not found!");
            } else {
                throw new Error("Error while get customer")
            }
        }
    }
}


module.exports = DoctorService;