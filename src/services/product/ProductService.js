const NotFoundError = require("../../exception/NotFoundError");

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async create(data) {
        return this.productRepository.create(data);
    }

    async findById(id) {
        return this.productRepository.findById(id);
    }

    async findAll() {
        return this.productRepository.findAll();
    }

    async update(id, data) {
        try {
            return this.productRepository.update(id, data);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Product not found!");
            } else {
                throw new Error(`Error while updating product: ${e.message}`);
            }
        }
    }

    async delete(id) {
        try {
            return this.productRepository.deleteById(id);
        } catch (e) {
            if (e instanceof NotFoundError) {
                throw new Error("Product not found!");
            } else {
                throw new Error(`Error while deleting product: ${e.message}`);
            }
        }
    }
}

module.exports = ProductService;
