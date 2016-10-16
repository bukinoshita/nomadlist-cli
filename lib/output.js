'use strict'

const chalk = require('chalk')

module.exports = (city, country, internet, cost) => {
  const output = [`
    ${chalk.bold.yellow('⇢ City:')} ${chalk.bold(city)}
    ${chalk.bold.yellow('⇢ Country:')} ${chalk.bold(country)}
    ${chalk.bold.yellow('⇢ Internet:')} ${chalk.bold(internet)}MBPS
    ${chalk.bold.yellow('⇢ Cost:')} $${chalk.bold(cost)}/m
  `].join('\n')

  return output
}
