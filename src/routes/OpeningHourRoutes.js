const express = require('express');
const router = express.Router();
const {PetShop, OpeningHours} = require('../models/index');
const sequelize = require('../models/index').sequelize;

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares//UUIDValidator');

const PetShopRepository = require('../repositories/pet_shop_repository/PetShopRepository');
const OpeningHourRepository = require('../repositories/opening_hours_repository/OpeningHoursRepository');
const PetShopService = require('../services/pet_shop/PetShopService');
const OpeningHoursService = require('../services/opening_hour/OpeningHourService');

const petShopRepository = new PetShopRepository(PetShop, sequelize);
const petShopService = new PetShopService(petShopRepository);
const openingHourRepository = new OpeningHourRepository(OpeningHours, sequelize);
const openingHoursService = new OpeningHoursService(openingHourRepository);

const OpeningHourController = require('../controllers/opening_hour/OpeningHourController');

const openingHourController = new OpeningHourController(openingHoursService, petShopService);

router.post('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    openingHourController.createOpeningHour.bind(openingHourController)
);

router.get('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    openingHourController.findOpeningHour.bind(openingHourController)
);

router.get('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    openingHourController.findOpeningHours.bind(openingHourController)
);

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    openingHourController.updateOpeningHour.bind(openingHourController)
);

router.delete('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    openingHourController.deleteOpeningHour.bind(openingHourController)
);

module.exports = router;