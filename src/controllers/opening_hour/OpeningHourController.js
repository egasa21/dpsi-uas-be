const NotFoundError = require("../../exception/NotFoundError")

class OpeningHourController {
    constructor(OpeningHourService, PetShopService) {
        this.OpeningHourService = OpeningHourService;
        this.PetShopService = PetShopService;
    }

    async createOpeningHour(req, res, next) {
        try {
            const petShop = await this.PetShopService.findById(req.params.id);
            if (!petShop) {
                throw new NotFoundError('Pet Shop Not Found');
            }

            console.log('pet shop',petShop.id)
            let {...payload} = req.body

            const openingHour = await this.OpeningHourService.create({
                petShopId: petShop.id,
                ...payload
            });

            res.status(201).json({message: "Opening hour successfully", openingHour});
        } catch (e) {
            next(e);
        }
    }

    async findOpeningHour(req, res, next) {
        try {
            const openingHour = await this.OpeningHourService.findById(req.params.id);
            if (!openingHour) {
                throw new NotFoundError('Opening hour not found');
            }

            res.status(200).json({message: "Opening hour found", openingHour});
        } catch (e) {
            next(e);
        }
    }

    async findOpeningHours(req, res, next) {
        try {
            const openingHours = await this.OpeningHourService.findAll()
            if (openingHours.length === 0) {
                throw new NotFoundError('Opening hour not found');
            }
            res.status(200).json({message: "Opening hours retrieved successfully", openingHours});
        } catch (e) {
            next(e);
        }
    }

    async updateOpeningHour(req, res, next) {
        try {
            const openingHour = await this.OpeningHourService.findById(req.params.id);
            if (!openingHour) {
                throw new NotFoundError('Opening hour not found');
            }

            const updatedOpeningHour = await this.OpeningHourService.update(openingHour.id, req.body)

            res.status(200).json({message: "Opening hour successfully", updatedOpeningHour});
        } catch (e) {
            next(e);
        }
    }

    async deleteOpeningHour(req, res, next) {
        try {
            const openingHour = await this.OpeningHourService.findById(req.params.id);
            if (!openingHour) {
                throw new NotFoundError('Opening hour not found');
            }

            await this.OpeningHourService.delete(openingHour.id);

            res.status(204).end()
        } catch (e) {
            next(e);
        }
    }
}


module.exports = OpeningHourController;