class CustomerController {
    constructor(customerService, userService) {
        this.customerService = customerService;
    }

    async registerCustomer(req, res, next) {
        try {
            const {id} = await req.user;

            const {...payload} = req.body;

            const customerData = {
                userId: id,
                ...payload
            }

            const customer = await this.customerService.create(customerData)

            res.status(201).json({message: 'User registered successfully', customer});
        }catch (err){
            next(err);
        }
    }
}


module.exports = CustomerController;