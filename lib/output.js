'use strict'

const chalk = require('chalk')

module.exports = (city, country, region, internet, cost, weather) => {
  const output = [`
${chalk.bold.yellow('⇢ City:')} ${chalk.bold(city)}
${chalk.bold.yellow('⇢ Country:')} ${chalk.bold(country)}
${chalk.bold.yellow('⇢ Region:')} ${chalk.bold(region)}
${chalk.bold.yellow('⇢ Internet:')} ${chalk.bold(internet)}MBPS
${chalk.bold.yellow('⇢ Cost:')} $${chalk.bold(cost)}/m
${chalk.bold.yellow('⇢ Weather:')} ${chalk.bold(weather)}°C
  `].join('\n')

  return output
}
