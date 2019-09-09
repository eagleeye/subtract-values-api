const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

module.exports = {
	validateSubtract
};

const validateSubtractSchema = {
	'$async': true,
	type: 'object',
	required: ['timestamp', 'data'],
	additionalProperties: false,
	properties: {
		timestamp: {
			type: 'integer'
		},
		data: {
			type: 'array',
			minItems: 2,
			maxItems: 2,
			items: [
				{
					type: 'object',
					additionalProperties: false,
					required: ['title', 'values'],
					properties: {
						title: {
							type: 'string',
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


const ajvValidateSubtract = ajv.compile(validateSubtractSchema);

function validateSubtract(data) {
	return ajvValidateSubtract(data);
}
