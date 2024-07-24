const express = require('express');
const router = express.Router();
const {Doctor} = require('../models/index');
const sequelize = require('../models/index').sequelize;
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares//UUIDValidator');

const DoctorRepository = require('../repositories/doctor_repository/DoctorRepository');
const DoctorService = require('../services/doctor/DoctorService');
const DoctorController = require('../controllers/doctor/DoctorController');

const doctorRepository = new DoctorRepository(Doctor, sequelize);
const doctorService = new DoctorService(doctorRepository);
const doctorController = new DoctorController(doctorService);

router.post('/create',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    doctorController.createDoctor.bind(doctorController)
)

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    doctorController.updateDoctor.bind(doctorController)
)


router.get("/",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    doctorController.findDoctors.bind(doctorController)
)

module.exports = router;