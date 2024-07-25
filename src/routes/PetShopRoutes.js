const express = require('express');
const router = express.Router();
const {PetShop} = require('../models/index');
const sequelize = require('../models/index').sequelize;

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares//UUIDValidator');

const PetShopRepository = require('../repositories/pet_shop_repository/PetShopRepository');
const PetShopService = require('../services/pet_shop/PetShopService');
const PetShopController = require('../controllers/pet_shop/PetShopController');

const petShopRepository = new PetShopRepository(PetShop, sequelize);
const petShopService = new PetShopService(petShopRepository);
const petShopController = new PetShopController(petShopService);

router.post('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    petShopController.createPetShop.bind(petShopController)
);

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    petShopController.updatePetShop.bind(petShopController)
);

router.get("/:id",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    petShopController.findPetShop.bind(petShopController)
);

router.delete("/:id",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    petShopController.deletePetShop.bind(petShopController)
    )
module.exports = router;