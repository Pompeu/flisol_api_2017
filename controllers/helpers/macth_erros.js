'use strict'

const madeRespose = (status, message) => {
  return {
    status: status,
    error: message
  }
}

module.exports = res => {
  return err => {
    let response = {}
    const errors = err.errors || []
    const message = errors.length ? errors[0].message : ''
    if (message.includes('unique')) {
      response = madeRespose(406, err.errors[0].message)
    } else if (message.includes('Validation')) {
      response = madeRespose(403, err.errors[0].message)
    } else {
      response = madeRespose(403, err.message)
    }

    return res.status(response.status).json({error: response.error})
  }
}
