#!/usr/bin/env node

'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const got = require('got')
const chalk = require('chalk')
const boxen = require('boxen')
const ora = require('ora')
const spinner = ora()

const cli = meow(`
  Usage
    $ nomadlist <city>

  Options
    -a, --all Get all cities
`)

updateNotifier({pkg: cli.pkg}).notify()

if (cli.flags.all || cli.flags.a) {
  spinner.start()

  got('https://nomadlist.com/api/v2/list/cities')
    .then(response => {
      spinner.stop()

      const cities = JSON.parse(response.body)

      cities.result.map((result) => {
        const { info, cost } = result
        const { city, country, internet } = info

        const output = [
          `${chalk.bold.yellow('⇢ City:')} ${chalk.bold(city.name)}
${chalk.bold.yellow('⇢ Country:')} ${chalk.bold(country.name)}
${chalk.bold.yellow('⇢ Internet:')} ${chalk.bold(internet.speed.download)}MBPS
${chalk.bold.yellow('⇢ Cost:')} $${chalk.bold(cost.expat.USD)}/m`
        ]

        console.log(boxen(output.join('\n'), {padding: 1, borderStyle: 'round'}))
      })

      process.exit(0)
    })
    .catch(err => {
      console.log(err)
    })
} else {
  cli.showHelp()
}
