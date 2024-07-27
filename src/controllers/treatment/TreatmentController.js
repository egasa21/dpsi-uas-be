const NotFoundError = require("../../exception/NotFoundError");

class TreatmentController {
    constructor(treatmentService, consultationService, petShopService) {
        this.treatmentService = treatmentService;
        this.consultationService = consultationService;
        this.petShopService = petShopService;
    }

    async createTreatment(req, res, next) {
        try {
            const consultation = await this.consultationService.findById(req.body.consultationId);
            const petShop = await this.petShopService.findById(req.body.petShopId);

            if (!consultation && !petShop) {
                throw new NotFoundError('Consultation or petShop Not Found');
            }

            const treatment = await this.treatmentService.create(req.body);
            res.status(201).json({message: "Treatment created successfully", treatment});
        } catch (e) {
            next(e);
        }
    }

    async findTreatment(req, res, next) {
        try {
            const treatment = await this.treatmentService.findById(req.params.id);
            if (!treatment) {
                throw new NotFoundError('Treatment not found');
            }
            res.status(200).json({message: "Treatment found", treatment});
        } catch (e) {
            next(e);
        }
    }

    async findAllTreatments(req, res, next) {
        try {
            const treatments = await this.treatmentService.findAll();
            res.status(200).json({message: "Treatments retrieved successfully", treatments});
        } catch (e) {
            next(e);
        }
    }

    async updateTreatment(req, res, next) {
        try {
            const treatment = await this.treatmentService.update(req.params.id, req.body);
            res.status(200).json({message: "Treatment updated successfully", treatment});
        } catch (e) {
            next(e);
        }
    }

    async deleteTreatment(req, res, next) {
        try {
            await this.treatmentService.delete(req.params.id);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = TreatmentController;
