'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';
import { RequestResponse } from 'request';

import { errorIs } from '../utility/error';

let accounts: any[] = [];

const base = 'https://graph.facebook.com/v2.11/';

const validate = (requestSet: any) => {
	if (!requestSet.hasOwnProperty('message')) {
		return false;
	}
	if (!requestSet.hasOwnProperty('link')) {
		return false;
	}
	return requestSet;
};

const postToFacebook = (account: FacebookInterfaces.Account, requestSet: any) => {
	const primaryEndpoint: string = account.primary_endpoint;
	const accessToken: string = account.access_token;
	const requestEndpoint = base + primaryEndpoint + '?access_token=' + accessToken;
	console.log(requestEndpoint);

	return new Promise((resolve, reject) => {
		request.post(
			{ url: requestEndpoint, json: true, form: requestSet },
			(error: any, response: RequestResponse, body: any) => {
				// console.log(error);
				// console.log(response);
				// console.log(response);
				// console.log(response.statusCode); // 200
				// console.log(response.headers['content-type']); // 'image/png'
				// console.log(response);
				// resolve({'foo': 'bar'});
				return resolve(body);
			}
		);
	});
};

// https://stackoverflow.com/questions/32828415/how-to-run-multiple-async-functions-then-execute-callback
const createPosts = (requestEndpoint: string, requestSet: any) => {
	// if ( "development" === process.env.environment ){
	const accountsConfig: any = require('../../config/accounts.json');
	accounts = accountsConfig.accounts;
	// console.log('devCheck', accounts);
	// }
	accounts.forEach((account) => {
		accounts.push(postToFacebook(account, requestSet));
	});
	return Promise.all(accounts)
		.then((allData) => {
			return allData;
		});
};

const createAPost = async (requestSet: any) => {
	const promise = new Promise<any>((resolve, reject) => {
		const accountsConfig: any = require('../../config/accounts.json');
		accounts = accountsConfig.accounts;
		const primaryAccount: any = accounts[0];
		const primaryEndpoint: string = primaryAccount.primary_endpoint;
		const accessToken: string = primaryAccount.access_token;
		const requestEndpoint = base + primaryEndpoint + '?access_token=' + accessToken;
		console.log(requestEndpoint);
		request.post(
			{ url: requestEndpoint, json: true, form: requestSet },
			(error: any, response: RequestResponse, body: any) => {
				// console.log(error);
				// console.log(response);
				// console.log(response);
				// console.log(response.statusCode); // 200
				// console.log(response.headers['content-type']); // 'image/png'
				// console.log(response);
				// resolve({'foo': 'bar'});
				resolve(body);
			}
		);
	});
	return promise;
};

export let postApi = async (req: Request, res: Response) => {
	console.log(accounts);
	const validRequestSet = validate(req.body);
	if (false === validRequestSet) {
		return errorIs(res, 501, 'invalidInput');
	}
	res.setHeader('Content-Type', 'application/json');
	console.log(validRequestSet);
	const response = await createAPost(validRequestSet);
	// console.log(response);
	res.json(response);
};
