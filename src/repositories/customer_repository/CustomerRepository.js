class CustomerRepository{
    constructor(CustomerModel) {
        this.CustomerModel = CustomerModel;
    }

    async create(data){
        return this.CustomerModel.create(data);
    }
}


module.exports = CustomerRepository;