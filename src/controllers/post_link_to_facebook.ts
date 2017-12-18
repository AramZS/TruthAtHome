'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';
import { RequestResponse } from 'request';

import { errorIs } from '../utility/error';

let accounts: Array<any> = [];

const validate = (requestSet: any) => {
	if (!requestSet.hasOwnProperty('message')){
		return false;
	}
	if (!requestSet.hasOwnProperty('link')){
		return false;
	}
	return requestSet;
}

const base = 'https://graph.facebook.com/v2.11/';
const checkPost = async (requestSet: any) => {
	const promise = new Promise<any>((resolve, reject) => {
		//if ( "development" === process.env.environment ){
			let accounts_config: any = require( '../../config/accounts.json' );
			accounts = accounts_config.accounts;
		//	console.log('devCheck', accounts);
		//}

		const primary_account: any = accounts[0];
		const primary_endpoint: string = primary_account.primary_endpoint;
		const access_token: string = primary_account.access_token;
		const requestEndpoint = base+primary_endpoint+'?access_token='+access_token;
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

export let postApi = async (req: Request, res: Response) => {
	console.log(accounts);
	const validRequestSet = validate(req.body);
	if (false === validRequestSet){
		return errorIs(res, 501, 'invalidInput');
	}
	res.setHeader('Content-Type', 'application/json');
	console.log(validRequestSet);
	const response = await checkPost(validRequestSet);
	//console.log(response);
	res.json(response);
};
