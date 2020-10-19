# Bikeshare

Bike sharing app based on Divvy data.

## Overview
See [requirements](requirements.md). 

Explanations on my solution:
1. If I were picking the JS language, I would use TypeScript rather than ES6, or alternatively use Flow.js. This helps in readability for defining interfaces and input / output parameters of functions.
2. For querying trips, because it doesn't fit nicely into standard REST paradigm, I used an `_` to denote a verb in the path, such as `_aggregateAgeByEndStations` and `_queryByEndStations`. This is similar to Elastic Search [_search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-query.html) 
   1. Realizing there are many ways to create REST API's and it can be a highly debated topic, it's quite easy to switch the endpoint, but to get something working I went with this.
3. For the "Latest 20 Trips" requirement, the API is a bit more flexible in allowing quantity to be picked, and it defaults to 20. I felt like hardcoding the word "twenty" into the API felt a bit less flexible than allowing user to choose the number.
   
This project was scaffolded from [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress/) to quickly get a base express app created.

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
* Invoke the `/stations` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/stations
  ```
The other endpoints that fulfill the requirements are:
```shell
curl http://localhost:3000/api/v1/trip-search/_aggregateAgeByEndStations?ids=1,2,3,99999
curl http://localhost:3000/api/v1/trip-search/_queryByEndStations?ids=1,2,3,533,235,12,4,5,2,7&quantity=20
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
