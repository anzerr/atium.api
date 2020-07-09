
import {Injectable, Inject} from '@anzerr/inject.ts';
import {Event} from '@anzerr/atium.broker';
import {Config} from './config';
import key from '@anzerr/unique.util';
import Request from '@anzerr/request.libary';

@Injectable()
export class Pool {

    event: any;
    load: boolean;
    id: number;
    ref: string;

    constructor(
        @Inject(Config) private readonly config: Config
    ) {
    	this.event = new Event({
    		socket: this.config.get().socket
    	});
    	this.ref = key.random({});
    	this.id = 0;
    	this.load = false;
    	this.event.init().then(() => {
    		this.load = true;
    	});
    }

    createTask(task: any): Promise<any> {
    	return new Request(`http://${this.config.get().api}`).json(task).post('/add');
    }

    add(taskName: string, input: any): Promise<any> {
    	if (!this.load) {
    		return Promise.reject(new Error('service is not loaded'));
    	}
    	const callback = `${this.ref}${this.id++}`;
    	this.createTask([
    		{tasks: [{
    			task: taskName,
    			input: {
    				callback: callback,
    				payload: input
    			}
    		}]}
    	]);
    	return new Promise((resolve) => {
    		this.event.subscribe(callback);

    		this.event.on(`event:${callback}`, (msg) => {
    			this.event.unsubscribe(callback);
    			resolve(msg);
    		});
    	});
    }

}
