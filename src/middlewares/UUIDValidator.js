const { validate: isUUID } = require('uuid')

class UUIDValidator {
    static validateUUID(req, res, next) {
        const { id } = req.params;
        if(!isUUID(id)){
            return res.status(400).send({message: 'Invalid UUID'});
        }
        next();
    }
}


module.exports = UUIDValidator;