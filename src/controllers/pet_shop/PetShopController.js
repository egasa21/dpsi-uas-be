const NotFoundError = require("../../exception/NotFoundError");

class PetShopController {
    constructor(petShopService) {
        this.petShopService = petShopService;
    }

    async createPetShop(req, res, next) {
        try {
            const petShop = await this.petShopService.create(req.body);
            res.status(201).json({message: "Pet Shop created successfully", petShop})
        } catch (e) {
            next(e);
        }
    }

    async updatePetShop(req, res, next) {
        try {
            const petShop = await this.petShopService.findById(req.params.id);
            console.log(petShop)
            if (!petShop) {
                return new NotFoundError('Pet Shop Not Found')
            }

            const updatedPetShop = await this.petShopService.update(petShop.id, req.body)

            res.status(200).json({message: "Pet shop updated successfully", updatedPetShop})
        } catch (e) {
            next(e);
        }
    }

    async findPetShop(req, res, next) {
        try {
            const petShop = await this.petShopService.findById(req.params.id);
            if (!petShop) {
                return new NotFoundError('Pet Shop Not Found')
            }

            res.status(200).json({message: "Pet Shop Not Found", petShop})
        } catch (e) {
            next(e);
        }
    }

    async deletePetShop(req, res, next) {
        try{
            await this.petShopService.delete(req.params.id);
            res.status(204).end()
        }catch (e) {
            next(e);
        }
    }
}


module.exports = PetShopController;