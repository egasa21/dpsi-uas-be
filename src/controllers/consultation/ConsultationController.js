const NotFoundError = require("../../exception/NotFoundError");

class ConsultationController {
    constructor(consultationService, doctorService) {
        this.consultationService = consultationService;
        this.doctorService = doctorService;
    }

    async createConsultation(req, res, next) {
        try {
            const {id} = await req.user;

            const {...payload} = req.body;

            const doctor = await this.doctorService.findById(req.body.doctorId);
            if (!doctor) {
                throw new NotFoundError('Doctor not found');
            }

            const consultationData = {
                userId: id,
                ...payload
            }

            const consultation = await this.consultationService.create(consultationData);
            res.status(201).json({message: "Consultation created successfully", consultation});
        } catch (e) {
            next(e);
        }
    }

    async findConsultation(req, res, next) {
        try {
            const consultation = await this.consultationService.findById(req.params.id);
            res.status(200).json({message: "Consultation found", consultation});
        } catch (e) {
            next(e);
        }
    }

    async findAllConsultations(req, res, next) {
        try {
            const consultations = await this.consultationService.findAll();
            res.status(200).json({message: "Consultations retrieved successfully", consultations});
        } catch (e) {
            next(e);
        }
    }

    async updateConsultation(req, res, next) {
        try {
            const doctor = await this.doctorService.findById(req.body.doctorId);
            if (!doctor) {
                throw new NotFoundError('Doctor not found');
            }

            const consultation = await this.consultationService.update(req.params.id, req.body);
            res.status(200).json({message: "Consultation updated successfully", consultation});
        } catch (e) {
            next(e);
        }
    }

    async deleteConsultation(req, res, next) {
        try {
            await this.consultationService.delete(req.params.id);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ConsultationController;
