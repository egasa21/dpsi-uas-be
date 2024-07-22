const express = require('express');
const CustomerRepository = require('../repositories/customer_repository/CustomerRepository');
const UserRepository = require('../repositories/user_repository/UserRepository');
const CustomerController = require('../controllers/customer/CustomerController');
const {User, Customer} = require('../models/index')
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const userRepository = new UserRepository(User);
const customerRepository = new CustomerRepository(Customer);
const customerController = new CustomerController(customerRepository, userRepository);

const router = express.Router();

router.post(
    '/create',
    AuthMiddleware.verifyToken.bind(AuthMiddleware),
    AuthMiddleware.verifyUser.bind(AuthMiddleware),
    customerController.registerCustomer.bind(customerController));

module.exports = router;
