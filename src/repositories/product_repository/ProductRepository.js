const NotFoundError = require("../../exception/NotFoundError");

class ProductRepository {
    constructor(ProductModel, sequelize) {
        this.ProductModel = ProductModel;
        this.sequelize = sequelize;
    }

    async create(data) {
        return this.ProductModel.create(data);
    }

    async findById(id) {
        return this.ProductModel.findByPk(id);
    }

    async findAll() {
        return this.ProductModel.findAll();
    }

    async update(id, data) {
        const transaction = await this.sequelize.transaction();
        try {
            const product = await this.ProductModel.findByPk(id, { transaction });
            if (!product) {
                throw new NotFoundError('Product not found');
            }

            const updatedProduct = await product.update(data, { transaction });
            await transaction.commit();

            return updatedProduct;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async deleteById(id) {
        const product = await this.ProductModel.findByPk(id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return await product.destroy();
    }
}

module.exports = ProductRepository;
