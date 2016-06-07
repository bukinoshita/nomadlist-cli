#!/usr/bin/env node

'use strict';

const program = require('commander');
const pkg = require('./package.json');
const version = pkg.version;
const got = require('got');
const spinner = require('./src/spinner');
const args = process.argv.slice(2);
const colors = require('colors/safe');

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

          console.log(colors.green.bold('City:'), nomadlist.info.city.name);
          console.log(colors.green.bold('Country:'), nomadlist.info.country.name);
          console.log(colors.green.bold('Cost:'), '$' + nomadlist.cost.nomad.USD + '/m');
          console.log(colors.green.bold('Internet:'), nomadlist.info.internet.speed.download + ' MBPS');
          console.log(colors.green.bold('Weather:'), nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
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
          var date = new Date(nomadlist.date);
          var newDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

          console.log(colors.green.bold('Date:'), newDate);
          console.log(colors.green.bold('Company:'), nomadlist.company);
          console.log(colors.green.bold('Position:'), nomadlist.position);
          console.log(colors.green.bold('URL:'), nomadlist.url);
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
