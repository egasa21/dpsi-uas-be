const NotFoundError = require("../../exception/NotFoundError");

class ProductController {
    constructor(ProductService) {
        this.ProductService = ProductService;
    }

    async createProduct(req, res, next) {
        try {
            const product = await this.ProductService.create(req.body);
            res.status(201).json({ message: "Product created successfully", product });
        } catch (e) {
            next(e);
        }
    }

    async findProduct(req, res, next) {
        try {
            const product = await this.ProductService.findById(req.params.id);
            if (!product) {
                throw new NotFoundError('Product not found');
            }
            res.status(200).json({ message: "Product found", product });
        } catch (e) {
            next(e);
        }
    }

    async findProducts(req, res, next) {
        try {
            const products = await this.ProductService.findAll();
            res.status(200).json({ message: "Products retrieved successfully", products });
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const updatedProduct = await this.ProductService.update(req.params.id, req.body);
            res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            await this.ProductService.delete(req.params.id);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = ProductController;
