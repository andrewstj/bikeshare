# Bikeshare

Bike sharing app based on Divvy data

## Overview
See [requirements](requirements.md). 

Things I would improve on:
1. Use TypeScript (was told to use Javascript, but I feel like defining interfaces is crucial in code readability)
   
Note: this project was scaffolded from [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress/) to quickly get a base express app created.

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/stations` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/stations
  ```

## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
## Lint It

Note, everytime you run `npm run dev`, lint/prettier automatically runs  to fix any issues and format the code.

View prettier linter output

```
npm run lint
```

Fix all prettier linter errors

```
npm run lint
```
