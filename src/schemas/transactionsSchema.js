import joi from 'joi';

const transactionsSchema = joi.object({
    type: joi.string().valid('entry', 'out'),
    value: joi.number().required(),
    description: joi.string().required()
});

export default transactionsSchema;
