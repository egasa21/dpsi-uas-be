const NotFoundError = require('../../exception/NotFoundError');

class CustomerRepository {
    constructor(CustomerModel, sequelize) {
        this.CustomerModel = CustomerModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.CustomerModel.create(data);
    }

    async update(id, data) {
        //db transaction
        const transaction = await this.sequelize.transaction()

        try {
            const customer = await this.CustomerModel.findByPk(id, {transaction});
            if (!customer) {
                new NotFoundError('Customer not found');
                return
            }

            const updatedCustomer = await customer.update(data, {transaction});
            await transaction.commit();

            return updatedCustomer;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}


module.exports = CustomerRepository;