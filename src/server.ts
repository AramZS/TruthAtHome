/**
 * Module dependencies.
 */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import expressValidator = require('express-validator');

import * as apiController from './controllers/api';
import * as authController from './controllers/auth';
import * as passthroughController from './controllers/passthrough';
import * as pushPostController from './controllers/post_link_to_facebook';

import * as dotenv from 'dotenv';

dotenv.load();

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3010);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.get('/', apiController.getApi);
app.post('/', apiController.getApi);
app.get('/auth', authController.getApi);
app.post('/auth', authController.postApi);
app.post('/post_link_to_facebook', pushPostController.postApi);
app.post('/post_links_to_facebook', pushPostController.postMultipleApi);
app.post('/passthrough', passthroughController.postApi);
app.get('/passthrough', passthroughController.getApi);
const server = app.listen(app.get('port'), () => {
	console.log(
		'  App is running at http://localhost:%d in %s mode',
		app.get('port'),
		app.get('env')
	);
	console.log('  Press CTRL-C to stop\n');
});

export {
	server, app
};
