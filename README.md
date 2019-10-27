# Enjoyit-challenge

## Deployed at

https://eduardorenani.github.io/enjoyit-challenge/

## Running the website locally

##### Start the node.js server side:
```
$ cd ./backend
$ yarn start

```
##### Then start the client side:
```
$ cd ./frontend
$ ng serve --port <port>

```
##### Now you can use your browser to access localhost:&lt;port&gt; and see the results.


## Running test cases:

##### In order to execute the test cases Mocha framework will run the test server at the same port as the Nodejs server, so it is important to kill any process running at the same port. In this particular case, 
```
$ kill -9 $(lsof -t -i:3000)

```
##### will handle it for us.

##### Then we can run mocha test cases:
```
$ cd ./backend
$ yarn test

```
