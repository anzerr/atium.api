

import 'reflect-metadata';
import {Task} from '@anzerr/atium.broker';
import {Module} from '@anzerr/inject.ts';

const db: any = {};

class UserLoginTask extends Task {

	constructor() {
		super({
			socket: 'localhost:3001',
	        api: 'localhost:3002',
			tasks: ['user_login'],
			type: 'default'
		});
		this.init();
	}

	run(task): any {
		const {payload} = task;
		console.log('UserLoginTask', this.who, payload);
		this.event(task.callback, {status: 200, data: {valid: (db[payload.user] === payload.password)}});
		return Promise.resolve();
	}

}

class AddUserTask extends Task {

	constructor() {
		super({
			socket: 'localhost:3001',
	        api: 'localhost:3002',
			tasks: ['user_add'],
			type: 'default'
		});
		this.init();
	}

	run(task): any {
		const {payload} = task;
		console.log('AddUserTask', this.who, payload, db);
		if (db[payload.user]) {
			this.event(task.callback, {status: 500, data: {error: 'user already exist'}});
			return Promise.resolve();
		}
		db[payload.user] = payload.password;
		this.event(task.callback, {status: 200, data: {added: true}});
		return Promise.resolve();
	}

}

new Module([AddUserTask, UserLoginTask]).build();

