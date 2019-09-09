const app = require('express')();
const subtractService = require('./services/subtract');
const bodyParser = require('body-parser');
const { port, env } = require('cnf');
const Ajv = require('ajv');

app.use(bodyParser.json());

app.post('/compute/:requestId', (req, res, next) => {
	subtractService.subtract(req.body, req.params.requestId)
		.then(data => res.json(data))
		.catch(next);
});

app.use((err, req, res, next) => {
	if (err instanceof Ajv.ValidationError) {
		console.warn(err);
		return res.status(400).json({
			message: err.message,
			errors: err.errors
		});
	}
	console.error(err);
	const error = {};
	if (['development', 'testing'].includes(env)) {
		error.stack = err.stack;
		error.message = err.message;
	} else {
		error.message = 'Internal Server Error';
	}
	res.status(500).json(error);
});

module.exports = {
	startApp: () => {
		return new Promise(resolve => {
			app.listen(port, function() {
				console.log(`App listening on port ${port}!`);
				resolve(app);
			});
		});
	}
};
