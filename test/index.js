const { expect } = require('chai')
const sinon = require('sinon')
const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { errorHandler } = require('../')

describe('errorHandler', () => {
  const req = {}
  const res = {
    getHeader() {},
    setHeader() {},
    end: sinon.spy()
  }
  const middleware = [errorHandler]

  afterEach(() => {
    res.end.reset()
  })

  it('should call handler', () => {
    const handler = sinon.spy()
    const result = applyMiddleware(middleware, handler)()
    expect(handler.calledOnce).to.equal(true)
  })

  it('should send formatted response', () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE'
    const handler = () => { throw new Error(ERROR_MESSAGE) }
    const result = applyMiddleware(middleware, handler)(req, res)
    const expectedResponse = JSON.stringify({
      error: {
        code: 500,
        message: ERROR_MESSAGE,
      },
    })
    expect(res.end.calledWith(expectedResponse)).to.equal(true)
  })

  it('should send correct status code', () => {
    const ERROR_MESSAGE = 'ERROR_MESSAGE'
    const err = new Error(ERROR_MESSAGE)
    err.statusCode = 401
    const handler = () => { throw err }
    const result = applyMiddleware(middleware, handler)(req, res)
    const expectedResponse = JSON.stringify({
      error: {
        code: err.statusCode,
        message: ERROR_MESSAGE,
      },
    })
    expect(res.end.calledWith(expectedResponse)).to.equal(true)
  })
})
