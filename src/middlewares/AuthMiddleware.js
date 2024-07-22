const jwt = require('jsonwebtoken');
const {User} = require('../models');
const AuthenticationError = require("../exception/AuthenticationError");
const NotFoundError = require("../exception/NotFoundError");
const AuthorizationError = require("../exception/AuthorizationError");
require('dotenv').config();

class AuthMiddleware {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }

    async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new AuthenticationError('No token provided!');
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                throw new AuthenticationError('No token provided!');
            }

            const decoded = jwt.verify(token, this.secret);
            req.userId = decoded.id;
            console.log(req.userId);
            next();
        } catch (err) {
            next(err)
        }
    }


    async verifyUser(req, res, next) {
        try {
            const user = await User.findByPk(req.userId);
            if (!user) {
                throw new NotFoundError('User not found!');
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).send({message: 'Unable to authenticate user!'});
        }
    }

    async verifyAdmin(req, res, next) {
        try {
            const user = await User.findByPk(req.userId);
            if (!user) {
                throw new NotFoundError('User not found!');
            }

            if (!user.isAdmin) {
                throw new AuthorizationError('Require Admin Role!');
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthMiddleware();
