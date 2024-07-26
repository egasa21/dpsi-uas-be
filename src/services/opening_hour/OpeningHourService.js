const NotFoundError = require("../../exception/NotFoundError")

class OpeningHourService {
    constructor(OpeningHoursRepository) {
        this.OpeningHoursRepository = OpeningHoursRepository;
    }

    async create(data) {
        return this.OpeningHoursRepository.create(data);
    }

    async findById(id) {
        return await this.OpeningHoursRepository.findById(id);
    }

    async findAll(){
        return await this.OpeningHoursRepository.findAll()
    }

    async update(id, data) {
        try {
            return await this.OpeningHoursRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Opening hour not found!")
            } else {
                throw new Error(`Error while updating opening hour: ${e.message}`)
            }
        }
    }

    async delete(id) {
        return await this.OpeningHoursRepository.deleteOne(id);
    }
}


module.exports = OpeningHourService;