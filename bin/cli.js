const server = require('../server');
server.startApp().catch(e => {
	throw e;
});
