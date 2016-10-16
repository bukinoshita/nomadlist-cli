'use strict'

const got = require('got')
const ora = require('ora')

const spinner = ora()
const apiUrl = 'https://nomadlist.com/api/v2/list/cities'

module.exports = () => {
  spinner.start()

  return got(apiUrl)
    .then((res) => {
      spinner.stop()

      const data = JSON.parse(res.body).result

      return data
  })
}
