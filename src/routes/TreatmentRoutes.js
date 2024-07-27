const express = require('express');
const router = express.Router();
const {Treatment} = require('../models/index');
const sequelize = require('../models/index').sequelize;

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares/UUIDValidator');

const TreatmentRepository = require('../repositories/treatment_repository/TreatmentRepository');
const TreatmentService = require('../services/treatment/TreatmentService');
const TreatmentController = require('../controllers/treatment/TreatmentController');
const PetShopRepository = require("../repositories/pet_shop_repository/PetShopRepository");
const {PetShop, Consultation} = require("../models");
const PetShopService = require("../services/pet_shop/PetShopService");
const ConsultationRepository = require("../repositories/consultation_repository/ConsultationRepository");
const ConsultationService = require("../services/consultation/ConsultationService");


const petShopRepository = new PetShopRepository(PetShop, sequelize);
const petShopService = new PetShopService(petShopRepository);

const consultationRepository = new ConsultationRepository(Consultation, sequelize);
const consultationService = new ConsultationService(consultationRepository);

const treatmentRepository = new TreatmentRepository(Treatment, sequelize);
const treatmentService = new TreatmentService(treatmentRepository);
const treatmentController = new TreatmentController(treatmentService, consultationService, petShopService);


router.post('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    treatmentController.createTreatment.bind(treatmentController)
);

router.get('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    treatmentController.findTreatment.bind(treatmentController)
);

router.get('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    treatmentController.findAllTreatments.bind(treatmentController)
);

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    treatmentController.updateTreatment.bind(treatmentController)
);

router.delete('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    treatmentController.deleteTreatment.bind(treatmentController)
);

module.exports = router;
