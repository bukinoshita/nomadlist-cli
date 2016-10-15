'use strict'

const got = require('got')
const ora = require('ora')

const spinner = ora()

module.exports = (url) => {
  spinner.start()

  return got(url)
    .then((res) => {
      spinner.stop()

      const data = JSON.parse(res.body).result

      return data
  })
}
