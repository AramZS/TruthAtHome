import {} from 'jest';
import * as supertest from 'supertest';

const port = process.env.PORT || 3010;
const request = supertest('http://localhost:' + port);

describe('GET /', () => {
	it('should return 200 OK', (done) => {
		request
			.get('/')
			.expect(200)
			.end((err, res) => {
				if (err) {
					throw err;
				}
				done();
			});

		request
			.get('/foobar')
			.expect(404)
			.end((err, res) => {
				if (err) {
					throw err;
				}
				done();
			});
	});
});

describe('GET /', () => {
	it('should return JSON', (done) => {
		request
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
});

describe('GET /', () => {
	it('should return a HAL description of API', (done) => {
		const promise = request
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/);
		return promise.then((response) => {
			expect(response).toBeDefined();
			// console.log(response.body);
			expect(response.body.application_name).toBe('TruthAtHome');
			expect(response.body._links.self).not.toBe('/foobar');
			expect(response.body._links.self).toBe('/');
			done();
		});
	});
});
