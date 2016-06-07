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
  .option('search <CityName>', 'Search cities by name')
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
  } else if(program.search) {
    const city = argv[1];

    spinner.start();

    got('https://nomadlist.com/api/v2/list/cities')
      .then(response => {
        spinner.stop();
        var cityList = JSON.parse(response.body);

        for(var i = 0; i < cityList.result.length; i++) {
          var nomadlist = cityList.result[i];
          var cityName = nomadlist.info.city.name;
          var searchLowerCase = city.toLowerCase();
          var cityLowerCase = cityName.toLowerCase();

          if(searchLowerCase == cityLowerCase) {
            console.log(colors.bold('/*-------------------------------- \n Informations \n--------------------------------*/'));
            console.log(colors.green.bold('City:'), nomadlist.info.city.name);
            console.log(colors.green.bold('Country:'), nomadlist.info.country.name);
            console.log(colors.green.bold('Region:'), nomadlist.info.region.name);
            console.log(colors.green.bold('Internet:'), nomadlist.info.internet.speed.download);
            console.log(colors.green.bold('Weather:'), nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
            console.log('\r\n');
            console.log(colors.bold('/*-------------------------------- \n Scores \n--------------------------------*/'));
            console.log(colors.green.bold('Nomad Score:'), nomadlist.scores.nomad_score);
            console.log(colors.green.bold('Life Score:'), nomadlist.scores.life_score);
            console.log(colors.green.bold('Free WiFi in City:'), nomadlist.scores.free_wifi_available);
            console.log(colors.green.bold('Nightlife:'), nomadlist.scores.nightlife);
            console.log(colors.green.bold('Places to Work From:'), nomadlist.scores.places_to_work);
            console.log(colors.green.bold('Air quality:'), nomadlist.scores.aircon);
            console.log(colors.green.bold('Safety:'), nomadlist.scores.safety);
            console.log(colors.green.bold('Fun:'), nomadlist.scores.leisure);
            console.log(colors.green.bold('Friendly to Foreigners:'), nomadlist.scores.friendly_to_foreigners);
            console.log(colors.green.bold('Racial Tolerance:'), nomadlist.scores.racism);
            console.log(colors.green.bold('Gay Friendly:'), nomadlist.scores.lgbt_friendly);
            console.log(colors.green.bold('Female Friendly:'), nomadlist.scores.female_friendly);
            console.log('\r\n');
            console.log(colors.bold('/*-------------------------------- \n Costs \n--------------------------------*/'));
            console.log(colors.green.bold('Local Cost of Living:'), '$' + nomadlist.cost.local.USD);
            console.log(colors.green.bold('NomadCost:'), '$' + nomadlist.cost.nomad.USD);
            console.log(colors.green.bold('Expat Cost of Living:'), '$' + nomadlist.cost.expat.USD + '/m');
            console.log(colors.green.bold('Hotel Room:'), '$' + nomadlist.cost.hotel.USD + '/d');
            console.log(colors.green.bold('Coworking Space:'), '$' + nomadlist.cost.coworking.monthly.USD + '/m');
            console.log(colors.green.bold('Airbnb Apartment:'), '$' + nomadlist.cost.airbnb_median.USD) + '/d';
            console.log(colors.green.bold('Coca-cola (0.3L):'), '$' + nomadlist.cost.non_alcoholic_drink_in_cafe.USD);
            console.log(colors.green.bold('Pint of beer (0.5L):'), '$' + nomadlist.cost.beer_in_cafe.USD);
            console.log(colors.green.bold('Cappucino:'), '$' + nomadlist.cost.coffee_in_cafe.USD);
          }
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
