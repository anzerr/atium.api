
import {Injectable} from '@anzerr/inject.ts';

@Injectable()
export class Config {

	config: any;

	constructor() {
		this.config = {
			socket: 'localhost:3001',
			api: 'localhost:3002'
		};
	}

	get(): any {
		return this.config;
	}

}
