# RaroLabs Back End Challenge

This project is a challenge made by RaroLabs to a selection process.
Technologies used:
- Node.js (Runtime)
- TypeScrypt (Programming language)
- Express.js (API frame work)
- Mocha (Tester)
- Sinon (Mock in test)

The objetive was to build an API REST that could:
- Get a pagination to the user given total pages and actual page;
- Retrieve a error message if given input is wrong;
- Test the endpoint;

## Preview

Preview the example live on Heroku.  
Make a GET request to https://spelta-rarolabs-challenge.herokuapp.com/paginacao?paginaAtual=###&quantidadePaginas=@@@ where:
```
###<Number>: Index of actual page,a
@@@<Number>: Number of total pages
```
Preview is running on a express server.  

## Instalation and Setup Instructions

Clone down this repository. You will need node, node-ts, npm, tsc installed globally on your machine.

### Installation:

```
git clone git@github.com:PedroSpelta/rarolabs-back.git
```
```
cd rarolabs-back
```
```
npm install
```

### Setup:

Create a .env on the project:

```
touch .env.local
```

You will need it on the app with the following variables:
- PORT, might be any port you want to run

## Running:
```
npm run dev(nodemon)
or
npm start(ts-node)
```
Make requests to the local with the port you specified
```
http://localhost:PORT/paginacao?paginaAtual=###&quantidadePaginas=@@@
```

## Testing:
```
npm run test
```
