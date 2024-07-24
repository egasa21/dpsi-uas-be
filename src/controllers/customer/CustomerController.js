const e = require("express");
const NotFoundError = require("../../exception/NotFoundError");

class CustomerController {
    constructor(customerService) {
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
            next(err);
        }
    }

    async getCustomer(req, res, next) {
        try {
            const customer = await this.customerService.findById(req.params.id);
            res.status(200).json({message: 'Customer retrieved successfully', customer});
        } catch (e) {
            next(e);
        }
    }

    async getCustomers(req, res, next) {
        try {
            const customers = await this.customerService.findAll()
            if (customers.length === 0) {
                return res.status(404).json({message: 'No customers found'});
            }

            res.status(200).json({customers});
        }catch (e) {
            next(e);
        }
    }
}


module.exports = CustomerController;