const server = require('/server');

module.exports = {
	ensureApp
};

let app = false;

async function ensureApp() {
	if (app) {
		return app;
	}
	return server.startApp();
}
