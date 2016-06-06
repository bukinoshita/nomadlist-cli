#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const version = pkg.version;
const request = require('request');
const args = process.argv.slice(2)

program
  .version(version)
  .usage('[options]')
  .option('work', 'List of places to work')
  .option('collections', 'List of collections')
  .option('cities', 'List of cities')
  .option('remote-work', 'List of remote jobs')
  .option('taylor', 'Taylor bot')
  .parse(process.argv);

const getMethod = (argv) => {
  if(!argv[0]) {
    program.help();
  } else if(argv == 'work') {
    const url = 'https://nomadlist.com/api/v2/list/work';

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);
      console.log(body);

      process.exit(0);
    });
  } else if(argv == 'collections') {
    const url = 'https://nomadlist.com/api/v2/list/collections';

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);
      console.log(body);

      process.exit(0);
    });
  } else if(argv == 'cities') {
    const url = 'https://nomadlist.com/api/v2/list/cities';

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);
      console.log(body);

      process.exit(0);
    });
  } else if(argv == 'remote-work') {
    const url = 'https://remoteok.io/index.json';

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);
      console.log(body);

      process.exit(0);
    });
  }

  return argv[0];
}

const taylor = () => {
  console.log('Loading places to taylor...');
}

const method = getMethod(args);

try {
  switch (method) {
    case 'taylor':
      taylor();
      break;

    default:
      console.log(method);
  }
} catch(e) {
  program.help();
}
