'use strict';

import * as async from 'async';
import { Request, Response } from 'express';
import * as request from 'request';

const check = async (domain: string) => {
	return {
		auth: 'a',
		foobar: 'b'
	};
};

/**
 * GET /api
 * List of API examples.
 */
export let getApi = async (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	console.log(req.query);
	const domain = req.query.domain || 'facebook.com';
	res.json(await check(domain));
};

export let postApi = async (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	// console.log(req.body);
	const domain = req.body.domain || 'facebook.com';
	res.json(await check(domain));
};
