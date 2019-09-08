const { expect } = require('chai');
const { validateSubtract } = require('./modules/validate');

module.exports = {
	subtract
};

async function subtract(data, requestId) {
	expect('requestId').to.be.a('string');
	validateSubtract(data);
	return {
		request_id: requestId,
		timestamp: data.timestamp,
		result: subtractArrays(data.data[0].values, data.data[1].values)
	};
}

function subtractArrays(arr1, arr2) {
	return arr1.map((el, index) => el - arr2[index]);
}
