const express = require('express');
const CustomerRepository = require('../repositories/customer_repository/CustomerRepository');
const UserRepository = require('../repositories/user_repository/UserRepository');
const CustomerService = require('../services/customer/CustomerService');  // Import CustomerService
const CustomerController = require('../controllers/customer/CustomerController');
const {User, Customer} = require('../models/index');
const sequelize = require('../models/index').sequelize;

// middleware untuk pembatasn hak akses
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const userRepository = new UserRepository(User);
const customerRepository = new CustomerRepository(Customer, sequelize);
const customerService = new CustomerService(customerRepository, userRepository);
const customerController = new CustomerController(customerService);
const UUIDValidator = require('../middlewares//UUIDValidator');

const router = express.Router();

router.post(
    '/create',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    customerController.registerCustomer.bind(customerController)
);

// pada update request selain cek token, nanti data yang ada pada token dipake buat cek id user itu owner data bukan, kalo bukan gabisa update
router.put(
    "/:id",
    AuthMiddleware.verifyToken.bind(AuthMiddleware), // untuk cek apakah token yang dipakai valid
    AuthMiddleware.verifyUser.bind(AuthMiddleware), // untuk cek pengguna memiliki token memiliki kases untuk melakukan update
    UUIDValidator.validateUUID,
    customerController.updateCustomer.bind(customerController)
);

router.get("/:id",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    UUIDValidator.validateUUID,
    customerController.getCustomer.bind(customerController)
)

router.get("/",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    // AuthMiddleware.verifyAdmin().bind(AuthMiddleware),
    customerController.getCustomers.bind(customerController)
)

module.exports = router;
