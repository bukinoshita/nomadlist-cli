#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const version = pkg.version;
const request = require('request');
const spinner = require('./src/spinner');
const args = process.argv.slice(2);

program
  .version(version)
  .usage('[options]')
  .option('cities', 'List of cities')
  .option('remote-work', 'List of remote jobs')
  .option('taylor', 'Taylor bot')
  .parse(process.argv);

const getMethod = (argv) => {
  if(!argv[0]) {
    program.help();
  } else if(argv == 'cities') {
    const url = 'https://nomadlist.com/api/v2/list/cities';

    console.log('Getting cities...');
    spinner.start();

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);

      for(var i = 0; i < body.result.length; i++) {
        var nomadlist = body.result[i];

        console.log('City: ', nomadlist.info.city.name);
        console.log('Country: ', nomadlist.info.country.name);
        console.log('Cost: ', '$' + nomadlist.cost.nomad.USD + '/m');
        console.log('Internet: ', nomadlist.info.internet.speed.download + ' MBPS');
        console.log('Weather: ', nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
        console.log('\r\n');
      }

      process.exit(0);
    });
  } else if(argv == 'remote-work') {
    const url = 'https://remoteok.io/index.json';

    console.log('Getting remote jobs...');
    spinner.start();

    request({
    	method: 'GET',
    	url: url
    }, function(error, response, body) {
      var body = JSON.parse(body);

      for(var i = 0; i < body.length; i++) {
        var nomadlist = body[i];

        console.log('Date: ', nomadlist.date);
        console.log('Company: ', nomadlist.company);
        console.log('Position: ', nomadlist.position);
        console.log('URL: ', nomadlist.url);
        console.log('\r\n');
      }

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
  }
} catch(e) {
  program.help();
}
