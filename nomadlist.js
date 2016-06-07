#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const version = pkg.version;
const request = require('request');
const got = require('got');
const spinner = require('./src/spinner');
const args = process.argv.slice(2);

program
  .version(version)
  .usage('[options]')
  .option('cities', 'List of cities')
  .option('remoteok', 'List of remote jobs')
  .option('taylor', 'Taylor bot')
  .parse(process.argv);

const api = (argv) => {
  if(!argv[0]) {
    program.help();
  } else if(program.cities) {
    spinner.start();

    got('https://nomadlist.com/api/v2/list/cities')
      .then(response => {
        spinner.stop();
        var cityList = JSON.parse(response.body);

        for(var i = 0; i < cityList.result.length; i++) {
          var nomadlist = cityList.result[i];

          console.log('City: ', nomadlist.info.city.name);
          console.log('Country: ', nomadlist.info.country.name);
          console.log('Cost: ', '$' + nomadlist.cost.nomad.USD + '/m');
          console.log('Internet: ', nomadlist.info.internet.speed.download + ' MBPS');
          console.log('Weather: ', nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
          console.log('\r\n');
        }

        process.exit(0);
      })
      .catch(error => {
        console.log(error);
      });
  } else if(program.remoteok) {
    spinner.start();

    got('https://remoteok.io/index.json')
      .then(response => {
        spinner.stop();

        var jobList = JSON.parse(response.body);

        for(var i = 0; i < jobList.length; i++) {
          var nomadlist = jobList[i];

          console.log('Date: ', nomadlist.date);
          console.log('Company: ', nomadlist.company);
          console.log('Position: ', nomadlist.position);
          console.log('URL: ', nomadlist.url);
          console.log('\r\n');
        }

        process.exit(0);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return argv[0];
}

api(args);
