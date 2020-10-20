# Bikeshare

Bike sharing app based on Divvy data.

## Overview
See [requirements](requirements.md). Also see [explanation](explanation.md) for more details on my approach to the problem.


## Get Started

### Pre-Requisite
Go to the server/common/resources directory and unzip the Divvy_Trips_2019_Q2.zip file to the same directory (it was too big to commit directly to GitHub).

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
* Open you're browser to [http://localhost:3000](http://localhost:3000) and click on the Interactive API Doc 
  * On the Interactive API Doc, be sure to click "Authorize" and set the value of the API key to unlock the API's. Value can be anything.
* Invoke the `/stations` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/stations?X-API-KEY=abc
  ```
The other endpoints that fulfill the requirements are:
```shell
curl http://localhost:3000/api/v1/trip-search/_aggregateAgeByEndStations?ids=1,2,3,99999&X-API-KEY=abc
curl http://localhost:3000/api/v1/trip-search/_queryByEndStations?ids=1,2,3,533,235,12,4,5,2,7&quantity=20&X-API-KEY=abc
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

## Lint It

Note, everytime you run `npm run dev`, lint/prettier automatically runs  to fix any issues and format the code.

View prettier linter output

```
npm run lint
```

Fix all prettier linter errors

```
npm run lint:fix
```
