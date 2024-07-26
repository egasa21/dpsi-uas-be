const express = require('express');
const router = express.Router();
const { Product } = require('../models/index');
const sequelize = require('../models/index').sequelize;

const AuthMiddleware = require('../middlewares/AuthMiddleware');
const UUIDValidator = require('../middlewares/UUIDValidator');

const ProductRepository = require('../repositories/product_repository/ProductRepository');
const ProductService = require('../services/product/ProductService');
const ProductController = require('../controllers/product/ProductController');

const productRepository = new ProductRepository(Product, sequelize);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    productController.createProduct.bind(productController)
);

router.get('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    productController.findProduct.bind(productController)
);

router.get('/',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    productController.findProducts.bind(productController)
);

router.put('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    productController.updateProduct.bind(productController)
);

router.delete('/:id',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    productController.deleteProduct.bind(productController)
);

module.exports = router;
