const NotFoundError = require('../../exception/NotFoundError');

class CustomerService {
    constructor(customerRepository, userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    async create(data) {
        const user = await this.userRepository.findUserById(data.userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return this.customerRepository.create(data);
    }

    async updateCustomer(id, data) {
        try {
            return await this.customerRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Customer not found!");
            } else {
                throw new Error("Error updating customer")
            }
        }
    }

    async findById(id) {
        try {
            return await this.customerRepository.findById(id)
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Customer not found!");
            } else {
                throw new Error("Error while get customer")
            }
        }
    }

    async findAll() {
        try {
            return await this.customerRepository.getAll()
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Customer not found!");
            } else {
                throw new Error("Error while get customer")
            }
        }
    }
}

module.exports = CustomerService;