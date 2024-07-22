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
}

module.exports = CustomerService;