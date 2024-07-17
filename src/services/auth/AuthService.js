const jwt = require('jsonwebtoken');
const InvariantError = require('../../exception/InvariantError');
const AuthenticationError = require("../../exception/AuthenticationError");

class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async register(data) {
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new InvariantError('Email is already taken')
        }

        return this.authRepository.create(data);

    }

    async login({email, password}) {
        const user = await this.authRepository.findUserByEmail(email)
        if (!user) {
            throw new AuthenticationError('Invalid email or password')
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new AuthenticationError('Invalid username or password');
        }

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return {token};
    }
}

module.exports = AuthService;