
import express from 'express';
const { NODE_ENV = 'dev' } = process.env;

export class ErrorModel {
	status: number;
	cause: string;
	message: string | string[];

	constructor(status?: number, cause?: string, message?: string | string[]){	
		this.status = status || 0;
		this.cause = cause || '';
		this.message = message || [];
	}

	newInternalServerError(message: string | string[]) {
		this.status = 500;
		this.cause = 'Internal Server Error';
		this.message = message;
		return this;
	}
	newBadRequest(message: string | string[]) {
		this.status = 400;
		this.cause = 'Bad Request';
		this.message = message;
		return this;
	}
	newNotFound(message: string | string[]) {
		this.cause = 'Not Found';
		this.status = 404;
		this.message = message;
		return this;
	}
	newUnauthorized(message: string | string[]) {
		this.cause = 'Unauthorized';
		this.status = 401;
		this.message = message;
		return this;
	}
	newForbidden(message: string | string[]) {
		this.cause = 'Forbidden';
		this.status = 403;
		this.message = message;
		return this;
	}
	print() {
		if (NODE_ENV === 'dev') {
			console.log(`
        Error: ${this.status}
        Cause: ${this.cause}
        Message: ${this.message}`);
		}
		return this;
	}
	send(res: express.Response) {
		this.print();
		return res.status(this.status).json({ message: this.message, cause: this.cause, status: this.status });
	}


}