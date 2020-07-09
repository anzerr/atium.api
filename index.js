const {spawn} = require('child_process');

const run = (cmd) => {
	const e = spawn('sh', ['-c', cmd]);
	e.stdout.on('data', (data) => {
		console.log(data.toString());
	});
	e.stderr.on('data', (data) => {
		console.error(data.toString());
	});
	e.on('error', (err) => {
		console.log('err', cmd, err);
	});
	e.on('close', (code) => {
		console.log(`child process exited with code ${code}`, cmd);
	});
};

run('npm run start-broker');
setTimeout(() => {
	run('npm run start-api');
	run('npm run start-worker');
}, 1000);
