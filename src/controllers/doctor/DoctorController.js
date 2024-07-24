class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }

    async createDoctor(req, res, next) {
        try {
            const doctor = await this.doctorService.create(req.body);
            res.status(200).send({message: "Doctor created successfully", doctor});
        } catch (e) {
            next(e)
        }
    }

    async updateDoctor(req, res, next) {
        try {
            const doctor = await this.doctorService.update(req.params.id, req.body);
            res.status(200).send({message: "Doctor updated successfully", doctor});
        } catch (e) {
            next(e)
        }
    }

    async findDoctor(req, res, next) {
        try {
            const doctor = await this.doctorService.findById(req.params.id);
            res.status(200).send({message: "Doctor find successfully", doctor});
        } catch (e) {
            throw e;
        }
    }

    async findDoctors(req, res, next) {
        try {
            const doctors = await this.doctorService.findAll()
            res.status(200).send({message: "Doctors retrieved successfully", doctors});
        } catch (e) {
            throw e;
        }
    }
}


module.exports = DoctorController;