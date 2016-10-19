#!/usr/bin/env node

'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const api = require('./lib/api')
const search = require('./lib/search')

const cli = meow(`
  Usage
    $ nomadlist             list of all cities
    $ nomadlist <city>      search for a city
    $ nomadlist --option    list of a specific option

  Example
    $ nomadlist
    $ nomadlist sao-paulo
    $ nomadlist new-york-city
    $ nomadlist --cheap
    $ nomadlist --nightlife

  Options
    --cheap                 less than $750/m to live
    --internet              with fast internet (> 15mbps)
    --work                  with places to work
    --safe                  safe cities
    --warm                  warm weather (above 21°C or 70°F)
    --affordable            less than 1250/m to live
    --mid                   less than 3000/m to live
    --expensive             over $3000/m to live
    --cold                  cold cities (less than 20°C or 68°F)
    --mild                  mild cities (between 16°C and 25°C or between 60°F and 77°F)
    --hot                   hot cities (above 30°C or 75°F)
    --air                   air quality as mensured by the AQI index
    --nightlife             great nightlife, clubs, festivals and culture
    --friendly              friendliness to foreigners
    
    --help, -h              Help
`)

updateNotifier({pkg: cli.pkg}).notify()

const flag = Object.keys(cli.flags)[0] || 'all'
const prop = cli.input[0] || 0

if (cli.flags.help || cli.flags.h) {
  cli.showHelp()
} else if (prop.length > 0) {
  console.log(`Searching for ${prop}...`)

  api().then(res => {
    res.map(result => {
      return search('search', prop)(result)
    })
  })
} else {
  console.log(`Searching for ${flag}...`)

  api().then(res => {
    res.map(result => {
      return search(flag)(result)
    })
  })
}
