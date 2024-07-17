const express = require('express');
const AuthRepository = require('../repositories/auth_repository/AuthRepository');
const AuthService = require('../services/auth/AuthService');
const AuthController = require('../controllers/auth/AuthController');
const {User} = require('../models/index')

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router;