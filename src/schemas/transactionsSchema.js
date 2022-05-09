import joi from 'joi';

const transactionsSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required()
});

export default transactionsSchema;
