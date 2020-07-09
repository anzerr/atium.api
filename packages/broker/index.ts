
import 'reflect-metadata';
import {Server} from '@anzerr/atium.broker';

new Server({
	socket: 'localhost:3001',
	api: 'localhost:3002'
});
