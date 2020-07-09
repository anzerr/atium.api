
import {Server, Controller, Post} from '@anzerr/http.ts';
import {Inject} from '@anzerr/inject.ts';
import {Meta} from '@anzerr/swagger.ts';
import {Pool} from './pool';

@Controller('user')
export class UserApi extends Server.Controller {

	@Inject(Pool)
	pool: Pool;

	@Post('add')
	@Meta.param.body({
		type: 'object',
		properties: {
			user: {type: 'string'},
			password: {type: 'string'}
		}
	})
	@Meta.responses(200, 'valid request')
	@Meta.responses(500, 'invalid request')
	addUser() {
		return this.data().then((data) => {
			if (data.user && data.password) {
				return this.pool.add('user_add', {
					user: data.user,
					password: data.password
				}).then((res) => {
					return this.status(res.status).json(res.data);
				});
			}
			this.status(500).send('invalid request');
		});
	}

	@Post('login')
	@Meta.param.body({
		type: 'object',
		properties: {
			user: {type: 'string'},
			password: {type: 'string'}
		}
	})
	@Meta.responses(200, 'valid request')
	@Meta.responses(500, 'invalid request')
	login() {
		return this.data().then((data) => {
			if (data.user && data.password) {
				return this.pool.add('user_login', {
					user: data.user,
					password: data.password
				}).then((res) => {
					return this.status(res.status).json(res.data);
				});
			}
			this.status(500).send('invalid request');
		});
	}

}
