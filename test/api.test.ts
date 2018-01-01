import { } from 'jest';
import * as supertest from 'supertest';
import { app, server } from '../src/server';

const port = process.env.PORT || 3010;

const request = supertest(app);

describe('GET /', () => {
	it('should return 200 OK', (done) => {
		return request
			.get('/')
			.expect(200)
			.end((err, res) => {
				if (err) {
					throw err;
				}
				done();
			});

	});
	it('should return 404 OK', (done) => {
		return request
			.get('/foobar')
			.expect(404)
			.end((err, res) => {
				if (err) {
					throw err;
				}
				done();
			});
	});
	it('should return JSON', (done) => {
		return request
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) {
					throw err;
				}
				done();
			});
	});
	it('should return a HAL description of API', async (done) => {
		expect.assertions(4);
		const response = await request
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/);

		expect(response).toBeDefined();
		// console.log(response.body, b);
		expect(response.body.name).toBe('TruthAtHome');
		expect(response.body._links.self).not.toBe('/foobar');
		expect(response.body._links.self).toBe('/');
		done();
		return response;
		// .done();
	});

	server.close();
});
