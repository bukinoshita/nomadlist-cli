#!/usr/bin/env node


'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _package = require('./../package.json');

var _spinner = require('./../src/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(2);

_commander2.default.version(_package.version).usage('[options]').option('cities', 'List of cities').option('remoteok', 'List of remote jobs').option('search <CityName>', 'Search cities by name').parse(process.argv);

var api = function api(argv) {
  if (!argv[0]) {
    _commander2.default.help();
  } else if (_commander2.default.cities) {
    _spinner2.default.start();

    (0, _got2.default)('https://nomadlist.com/api/v2/list/cities').then(function (response) {
      _spinner2.default.stop();

      var cityList = JSON.parse(response.body);

      for (var i = 0; i < cityList.result.length; i++) {
        var nomadlist = cityList.result[i];

        console.log(_safe2.default.green.bold('City:'), nomadlist.info.city.name);
        console.log(_safe2.default.green.bold('Country:'), nomadlist.info.country.name);
        console.log(_safe2.default.green.bold('Cost:'), '$' + nomadlist.cost.nomad.USD + '/m');
        console.log(_safe2.default.green.bold('Internet:'), nomadlist.info.internet.speed.download + ' MBPS');
        console.log(_safe2.default.green.bold('Weather:'), nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
        console.log('\r\n');
      }

      process.exit(0);
    }).catch(function (err) {
      console.log(err);
    });
  } else if (_commander2.default.remoteok) {
    _spinner2.default.start();

    (0, _got2.default)('https://remoteok.io/index.json').then(function (response) {
      _spinner2.default.stop();

      var jobList = JSON.parse(response.body);

      for (var i = 0; i < jobList.length; i++) {
        var nomadlist = jobList[i];
        var date = new Date(nomadlist.date);
        var newDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

        console.log(_safe2.default.green.bold('Date:'), newDate);
        console.log(_safe2.default.green.bold('Company:'), nomadlist.company);
        console.log(_safe2.default.green.bold('Position:'), nomadlist.position);
        console.log(_safe2.default.green.bold('URL:'), nomadlist.url);
        console.log('\r\n');
      }

      process.exit(0);
    }).catch(function (err) {
      console.log(err);
    });
  } else if (_commander2.default.search) {
    (function () {
      var city = argv[1];

      _spinner2.default.start();

      (0, _got2.default)('https://nomadlist.com/api/v2/list/cities').then(function (response) {
        _spinner2.default.stop();

        var cityList = JSON.parse(response.body);

        for (var i = 0; i < cityList.result.length; i++) {
          var nomadlist = cityList.result[i];
          var cityName = nomadlist.info.city.name;
          var searchLowerCase = city.toLowerCase();
          var cityLowerCase = cityName.toLowerCase();

          if (searchLowerCase == cityLowerCase) {
            console.log(_safe2.default.bold('/*-------------------------------- \n Informations \n--------------------------------*/'));
            console.log(_safe2.default.green.bold('City:'), nomadlist.info.city.name);
            console.log(_safe2.default.green.bold('Country:'), nomadlist.info.country.name);
            console.log(_safe2.default.green.bold('Region:'), nomadlist.info.region.name);
            console.log(_safe2.default.green.bold('Internet:'), nomadlist.info.internet.speed.download);
            console.log(_safe2.default.green.bold('Weather:'), nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
            console.log('\r\n');
            console.log(_safe2.default.bold('/*-------------------------------- \n Scores \n--------------------------------*/'));
            console.log(_safe2.default.green.bold('Nomad Score:'), nomadlist.scores.nomad_score);
            console.log(_safe2.default.green.bold('Life Score:'), nomadlist.scores.life_score);
            console.log(_safe2.default.green.bold('Free WiFi in City:'), nomadlist.scores.free_wifi_available);
            console.log(_safe2.default.green.bold('Nightlife:'), nomadlist.scores.nightlife);
            console.log(_safe2.default.green.bold('Places to Work From:'), nomadlist.scores.places_to_work);
            console.log(_safe2.default.green.bold('Air quality:'), nomadlist.scores.aircon);
            console.log(_safe2.default.green.bold('Safety:'), nomadlist.scores.safety);
            console.log(_safe2.default.green.bold('Fun:'), nomadlist.scores.leisure);
            console.log(_safe2.default.green.bold('Friendly to Foreigners:'), nomadlist.scores.friendly_to_foreigners);
            console.log(_safe2.default.green.bold('Racial Tolerance:'), nomadlist.scores.racism);
            console.log(_safe2.default.green.bold('Gay Friendly:'), nomadlist.scores.lgbt_friendly);
            console.log(_safe2.default.green.bold('Female Friendly:'), nomadlist.scores.female_friendly);
            console.log('\r\n');
            console.log(_safe2.default.bold('/*-------------------------------- \n Costs \n--------------------------------*/'));
            console.log(_safe2.default.green.bold('Local Cost of Living:'), '$' + nomadlist.cost.local.USD);
            console.log(_safe2.default.green.bold('NomadCost:'), '$' + nomadlist.cost.nomad.USD);
            console.log(_safe2.default.green.bold('Expat Cost of Living:'), '$' + nomadlist.cost.expat.USD + '/m');
            console.log(_safe2.default.green.bold('Hotel Room:'), '$' + nomadlist.cost.hotel.USD + '/d');
            console.log(_safe2.default.green.bold('Coworking Space:'), '$' + nomadlist.cost.coworking.monthly.USD + '/m');
            console.log(_safe2.default.green.bold('Airbnb Apartment:'), '$' + nomadlist.cost.airbnb_median.USD) + '/d';
            console.log(_safe2.default.green.bold('Coca-cola (0.3L):'), '$' + nomadlist.cost.non_alcoholic_drink_in_cafe.USD);
            console.log(_safe2.default.green.bold('Pint of beer (0.5L):'), '$' + nomadlist.cost.beer_in_cafe.USD);
            console.log(_safe2.default.green.bold('Cappucino:'), '$' + nomadlist.cost.coffee_in_cafe.USD);
          }
        }

        process.exit(0);
      }).catch(function (err) {
        console.log(err);
      });
    })();
  }

  return argv[0];
};

api(args);