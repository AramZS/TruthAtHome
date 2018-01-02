'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';
import { RequestResponse } from 'request';

import { errorIs } from '../utility/error';

const validate = (requestSet: any) => {
	if (!requestSet.hasOwnProperty('access_token')) {
		return false;
	}
	return requestSet;
};

const generateLongLivedTokenFromShortLived = async (requestSet: any) => {
	return new Promise<any>((resolve, reject) => {
		let requestEndpoint = base + 'oauth/access_token?grant_type=fb_exchange_token';
		requestEndpoint += '&client_id=' + process.env.client_id;
		requestEndpoint += '&client_secret=' + process.env.client_secret;
		requestEndpoint += '&fb_exchange_token=' + requestSet.access_token;
		requestEndpoint += '&access_token=' + requestSet.access_token;
		console.log(requestEndpoint);
		request.get(
			{ url: requestEndpoint, json: true },
			(error: any, response: RequestResponse, body: any) => {
				// console.log(error);
				// console.log(response);
				//console.log(body);
				// console.log(response.statusCode); // 200
				// console.log(response.headers['content-type']); // 'image/png'
				//resolve({'foo': 'bar'});
				resolve(body);
			}
		);
	});
};

const base = 'https://graph.facebook.com/v2.11/';
// https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension
const checkGet = async (requestSet: any) => {
	const promise = await generateLongLivedTokenFromShortLived(requestSet);
	return promise;
};

/**
 * GET /api
 * List of API examples.
 */
export let getApi = async (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const validRequestSet = validate(req.query);
	if (!validRequestSet) {
		return errorIs(res, 501, 'invalidInput');
	}
	console.log(validRequestSet);
	res.json(await checkGet(validRequestSet));
};
