
import 'reflect-metadata';
import {Server} from '@anzerr/http.ts';
import {Swagger, SwaggerDocument} from '@anzerr/swagger.ts';
import * as color from '@anzerr/console.color';
import {UserApi} from './src/api';

const document = new SwaggerDocument();

const s = new Server(3000)
	.withController([Swagger, UserApi]);

s.on('log', (arg) => {
	if (arg[0] === 'request') {
		console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), color.white(arg[1]));
	}
}).on('error', (err) => {
	console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), color.red(err));
}).on('timeout', (err) => {
	console.log(color.cyan(`HTTP:${(new Date()).toUTCString()}`), color.red('request timeout'), err);
});

s.start().then(() => {
	Swagger.json = document.withServer(s).toJson();
	return s;
}).catch((err) => {
	console.log(err);
	process.exit(1);
});
