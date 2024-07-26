const express = require('express');
const router = express.Router();
const { Consultation } = require('../models/index');
const sequelize = require('../models/index').sequelize;

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares/UUIDValidator');

const ConsultationRepository = require('../repositories/consultation_repository/ConsultationRepository');
const ConsultationService = require('../services/consultation/ConsultationService');
const ConsultationController = require('../controllers/consultation/ConsultationController');
const DoctorRepository = require("../repositories/doctor_repository/DoctorRepository");
const {Doctor} = require("../models");
const DoctorService = require("../services/doctor/DoctorService");

const consultationRepository = new ConsultationRepository(Consultation, sequelize);
const consultationService = new ConsultationService(consultationRepository);
const doctorRepository = new DoctorRepository(Doctor, sequelize);
const doctorService = new DoctorService(doctorRepository);

const consultationController = new ConsultationController(consultationService, doctorService);

router.post('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    consultationController.createConsultation.bind(consultationController)
);

router.get('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    consultationController.findConsultation.bind(consultationController)
);

router.get('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    consultationController.findAllConsultations.bind(consultationController)
);

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    consultationController.updateConsultation.bind(consultationController)
);

router.delete('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    consultationController.deleteConsultation.bind(consultationController)
);

module.exports = router;
