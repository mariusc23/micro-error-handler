const { send } = require('micro')

const errorHandler = next => async (req, res) => {
  try {
    return await next(req, res)
  } catch (err) {
    const code = err.statusCode || 500
    const message = err.message || 'Unknown Error'
    const payload = {
     error: {
       code,
       message,
     }
    }
    if (process.env.NODE_ENV === 'development') {
      payload.error.stack = err.stack;
    }
    send(res, code, payload)
  }
}

module.exports = {
  errorHandler,
}
