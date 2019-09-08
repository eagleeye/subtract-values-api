const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

module.exports = {
	validateSubtract
};

const validateSubtractSchema = {
	type: 'object',
	required: true,
	additionalProperties: false,
	properties: {
		timestamp: {
			type: 'integer',
			minValue: 0,
			maxValue: 2147483648 //max timestamp value
		},
		data: {
			type: 'array',
			minItems: 2,
			maxItems: 2,
			items: [
				{
					type: 'object',
					required: 'true',
					additionalProperties: false,
					properties: {
						title: {
							type: 'string',
							required: true
						},
						values: {
							type: 'array',
							minItems: 6,
							maxItems: 6,
							items: [
								{
									type: 'number'
								}
							]
						}
					}
				}
			]
		}
	}
};



function validateSubtract(data) {
	const ajvValidateSubtract = ajv.compile(validateSubtractSchema);
	const valid = ajvValidateSubtract(data);
	if (!valid) {
		throw ajvValidateSubtract.errors;
	}
}
