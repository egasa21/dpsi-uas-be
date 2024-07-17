class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res, next) {
        try {
            const data = req.body
            const user = await this.authService.register(data);
            res.status(201).json({message: "User registered successfully", user});
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const {token} = await this.authService.login({email, password});
            res.status(200).json({message: 'Login successful', token});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;