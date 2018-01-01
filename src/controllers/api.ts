'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.json({
		name: 'TruthAtHome',
		description: 'Robots using your Facebook wall for good.',
		_links: {
			self: '/',
			routes: {
				'passthrough': {
					methods: ['GET', 'POST'],
					description: 'Neutral endpoint that will pass your requests to the Facebook API',
					args: {
						access_token: {
							required: true
						},
						endpoint: {
							required: true
						},
						format: {
							required: true,
							default: 'json'
						}
					}
				},
				'post_link_to_facebook': {
					methods: ['POST'],
					description: 'Post a link to Facebook',
					message: {
						required: true
					},
					link: {
						required: true
					}
				}
			}
		}
	});
};
