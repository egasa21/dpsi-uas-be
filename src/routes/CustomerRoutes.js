const express = require('express');
const CustomerRepository = require('../repositories/customer_repository/CustomerRepository');
const UserRepository = require('../repositories/user_repository/UserRepository');
const CustomerService = require('../services/customer/CustomerService');  // Import CustomerService
const CustomerController = require('../controllers/customer/CustomerController');
const { User, Customer } = require('../models/index');
const sequelize = require('../models/index').sequelize;
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const userRepository = new UserRepository(User);
const customerRepository = new CustomerRepository(Customer, sequelize);
const customerService = new CustomerService(customerRepository, userRepository);  // Instantiate CustomerService
const customerController = new CustomerController(customerService);  // Inject CustomerService into CustomerController

const router = express.Router();

router.post(
    '/create',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    customerController.registerCustomer.bind(customerController)
);

router.put(
    "/:id",
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    customerController.updateCustomer.bind(customerController)
);

module.exports = router;
