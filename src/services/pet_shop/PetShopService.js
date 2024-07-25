const NotFoundError = require( "../../exception/NotFoundError");

class PeShopService {
    constructor(petShopRepository) {
        this.petShopRepository = petShopRepository;
    }

    async create(data) {
        return this.petShopRepository.create(data);
    }

    async update(id, data) {
        try {
            return this.petShopRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Pet shop not found!");
            } else {
                throw new Error("Error while updating pet shop")
            }
        }
    }

    async findById(id) {
        return this.petShopRepository.findById(id)
    }

    async delete(id) {
        try {
            return await this.petShopRepository.deleteById(id);
        }catch (e){
            throw e;
        }
    }
}


module.exports = PeShopService;