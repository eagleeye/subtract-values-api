const app = require('express')();
const subtractService = require('./services/subtract');
const bodyParser = require('body-parser')
const { port } = require('cnf');

app.use(bodyParser.json());

app.post('/compute/:requestId', (req, res, next) => {
	subtractService.subtract(req.body, req.params.requestId)
		.then(data => res.json(data))
		.catch(next);
});

app.use((err, req, res, next) => {
	// if ()
	res.json(err);
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
