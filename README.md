
### `Intro`
Creates a api that will create tasks for each request to be worked on by a outside worker.

- broker (broker that pools the task and emits events throught the network)
- api (front api that creates tasks)
- worker (has two workers one to create a user into a "db" and an other to validate the password)

#### `Run`
``` bash
npm run start
```
