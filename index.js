const { send } = require('micro')

const errorHandler = next => (req, res) => {
  try {
    return next(req, res)
  } catch (err) {
    const code = err.statusCode || 500
    const message = err.message || 'Unknown Error'
    const payload = {
      error: {
        code,
        message,
      },
    }
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
      payload.error.stack = err.stack
    }
    return send(res, code, payload)
  }
}

module.exports = {
  errorHandler,
}
