
import { Request, Response } from 'express';

/**
 * A helper class for generating JSON error responses
 */

export let errorIs = (res: Response, code: number, type: string) => {
	return res.status(code).send({
		status: 'Error',
		type
	});
};
