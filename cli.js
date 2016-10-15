#!/usr/bin/env node

'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const api = require('./lib/api')

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

const prop = cli.input[0]
const apiUrl = 'https://nomadlist.com/api/v2/list/cities'

updateNotifier({pkg: cli.pkg}).notify()

if (cli.flags.help || cli.flags.h) {
  cli.showHelp()
} else if (cli.flags.cheap || cli.flags.c) {
} else {
  api(apiUrl).then(console.log)
}
