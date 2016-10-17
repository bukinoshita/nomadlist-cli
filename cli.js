#!/usr/bin/env node

'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const api = require('./lib/api')
const output = require('./lib/output')

const cli = meow(`
  Usage
    $ nomadlist
    $ nomadlist <city>
    $ nomadlist --option

  Options
    -c, --cheap      cheap cities (less than $1250/m)
    -i, --internet   with fast internet (> 15mbps)
    -w, --work       with great places to work
    -s, --safe       safe cities
    -w, --warm       warm weather (< 32C)
    
    --affordable     affordable (less than $3000/m)
    --expensive      expensive (over $3000/m)
    --cold           cold cities (< 20C)
    --hot            hot cities (> 32C)
    
    -h, --help       Help
`)

updateNotifier({pkg: cli.pkg}).notify()

if (cli.flags.cheap || cli.flags.c) {
  api().then(res => {
    res.map(result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (cost.expat.USD < 1250) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }

      return false
    })
  })
} else if (cli.flags.internet || cli.flags.i) {
  api().then(res => {
    res.map(result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (internet.speed.download > 15) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }

      return false
    })
  })
} else if (cli.flags.work || cli.flags.w) {
  api().then(res => {
    res.map(result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.places_to_work > 0.5) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }

      return false
    })
  })
} else if (cli.flags.safe || cli.flags.s) {
  api().then(res => {
    res.map(result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.safety > 0.5) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }

      return false
    })
  })
} else if (cli.flags.warm) {
  api().then(res => {
    res.map(result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (weather.temperature.celsius < 32) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }

      return false
    })
  })
} else {
  api().then(res => {
    res.map(result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info
      const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
      console.log(nomadlist)

      return false
    })
  })
}
