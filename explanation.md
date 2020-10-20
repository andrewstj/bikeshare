# Technologies used
1. NodeJS
2. ES6
3. Express server
4. [generator-express-no-stress](https://github.com/cdimascio/generator-express-no-stress/) to quickly get a base express app created
5. express-openapi-validator (to handle OpenAPI 3 spec and validation)


# Explanations on my solution
1. If I were picking the JS language, I would use TypeScript rather than ES6, or alternatively use Flow.js. This helps in readability for defining interfaces and input / output parameters of functions.
2. For querying trips, because it doesn't fit nicely into standard REST paradigm, I used an `_` to denote a verb in the path, such as `_aggregateAgeByEndStations` and `_queryByEndStations`. This is similar to Elastic Search [_search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-query.html) 
   1. Realizing there are many ways to create REST API's and it can be a highly debated topic, it's quite easy to switch the endpoint, but to get something working I went with this.
3. For the "Latest 20 Trips" requirement, the API is a bit more flexible in allowing quantity to be picked, and it defaults to 20. I felt like hardcoding the word "twenty" into the API felt a bit less flexible than allowing user to choose the number.
4. I try to have the code be as self documenting as possible, and added some JSDoc to certain places where it's harder to tell what the function input/output is.
5. The OpenAPI 3 spec file can be found here: [api.yml](server/api/../common/api.yml)
