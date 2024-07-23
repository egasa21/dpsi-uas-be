const e = require("express");
const NotFoundError = require("../../exception/NotFoundError");

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
        } catch (err) {
            next(err);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const customer = await this.customerService.updateCustomer(req.params.id, req.body);
            res.status(201).json({message: 'Customer updated successfully', customer});
        } catch (err) {
            // if (err.message === "Customer not found") {
            //     res.status(401).json({message: err.message});
            // } else {
            //     res.status(500).json({message: err.message});
            // }
            next(err);
        }
    }
}


module.exports = CustomerController;