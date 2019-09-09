const { expect } = require('chai');
const { ensureApp } = require('./helpers');
const request = require('request-promise-native');
const { port } = require('cnf');
const uuid = require('uuid/v4');

const post = ({ requestId, body, simple = true, resolveWithFullResponse = false } = {}) => {
	return request.post({
		url: `http://localhost:${port}/compute/${requestId}`,
		json: true,
		simple,
		resolveWithFullResponse,
		body
	});
};

describe('subtract.spec.js', () => {
	before('ensureApp', () => ensureApp());

	it('should subtract arrays', async () => {
		const id = uuid();
		const timestamp = 1493758596;
		const input = {
			timestamp,
			data: [
				{ title: 'Part1', values: [0, 3, 5, 6, 2, 9] },
				{ title: 'Part2', values: [6, 3, 1, 3, 9, 4] }
			]
		};
		const res = await (post({ requestId: id, body: input }));
		expect(res).to.deep.eql({
			request_id: id,
			timestamp: timestamp,
			result: {
				title: 'Result',
				values: [-6, 0, 4, 3, -7, 5]
			}
		});
	});

	it('should validate invalid input', async () => {
		const res = await post({
			id: 443,
			body: {
				wrongObject: true
			},
			simple: false,
			resolveWithFullResponse: true
		});
		expect(res.statusCode, res.body).to.be.eql(400);
		expect(res.body).to.have.property('errors').to.be.an('array');
	});
});
