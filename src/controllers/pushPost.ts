'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';
import { RequestResponse } from 'request';

const validate = (requestSet: any) => {
	if (!requestSet.hasOwnProperty('format')){
		requestSet.format = 'json';
	}
	return requestSet;
}

const base = 'https://graph.facebook.com/v2.11/me/feed';
const checkPost = async (requestSet: any) => {
	const promise = new Promise<any>((resolve, reject) => {
		const requestEndpoint = base+'?access_token='+requestSet.access_token;
		console.log(requestEndpoint);
		request.post(
			{ url: requestEndpoint, json: true, form: requestSet },
			(error: any, response: RequestResponse, body: any) => {
				// console.log(error);
				// console.log(response);
				// console.log(response);
				// console.log(response.statusCode); // 200
				// console.log(response.headers['content-type']); // 'image/png'
				//console.log(response);
				//resolve({'foo': 'bar'});
				resolve(body);
			}
		);
	});
	return promise;
};

const checkGet = async (requestSet: any) => {
	const promise = new Promise<any>((resolve, reject) => {
		const requestEndpoint = base+requestSet.endpoint+'?access_token='+requestSet.access_token;
		request.get(
			{ url: base, json: true },
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
	return promise;
};

/**
 * GET /api
 * List of API examples.
 */
export let getApi = async (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const validRequestSet = validate(req.query);
	console.log(validRequestSet);
	res.json(await checkGet(validRequestSet));
};

export let postApi = async (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const validRequestSet = validate(req.body);
	console.log(validRequestSet);
	const response = await checkPost(validRequestSet);
	//console.log(response);
	res.json(response);
};
