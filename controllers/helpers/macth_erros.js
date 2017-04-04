'use strict'

module.exports = (res, err) => {
  let response = {}
  if (err.errors[0].message.includes('unique')) {
    response = {
      status: 406,
      error: err.errors[0].message
    }
  } else {
    response = {
      status: 403 ,
      error:  err.errors[0].message
    }
  }

  return res.status(response.status).json({error: response.error})
}
