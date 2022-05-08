import joi from 'joi';

//const valueRegex = /[0-9]\,[0-9]/

const transactionsSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required()
});

export default transactionsSchema;
