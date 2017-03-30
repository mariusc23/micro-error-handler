# micro-error-handler

> Error handler middleware for [micro](https://github.com/zeit/micro).

## Installation

    npm install --save @mariusc23/micro-error-handler

## Usage

```js
const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { errorHandler } = require('@mariusc23/micro-error-handler')

module.exports = applyMiddleware([errorHandler], async (req, res) => {
  return 'Hello world'
})
```

## Example Response

```json
{
  "error": {
    "code": 500,
    "message": "Unknown Error"
  }
}
```

## License

Copyright (c) 2017 Marius Craciunoiu. Licensed under the MIT license.
