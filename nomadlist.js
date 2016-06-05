#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('./package.json');
var request = require('request');

program
  .version(pkg.version)
  .usage('[options] <keywords>')
  .parse(process.argv);

if(!program.args.length) {
  request({
  	method: 'GET',
  	url: 'https://nomadlist.com/api/v2/list/cities'
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
} else {
  var keywords = program.args;
	var url = 'https://nomadlist.com/api/v2/list/cities/';

  request({
  	method: 'GET',
  	url: url
  }, function(error, response, body) {
    var body = JSON.parse(body);

    for(var i = 0; i < body.result.length; i++) {
      var nomadlist = body.result[i];

      if(keywords == nomadlist.info.city.name) {
        console.log('/*-------------------------------- \n Informations \n--------------------------------*/');
        console.log('City: ', nomadlist.info.city.name);
        console.log('Country: ', nomadlist.info.country.name);
        console.log('Region: ', nomadlist.info.region.name);
        console.log('Internet: ', nomadlist.info.internet.speed.download);
        console.log('Weather: ', nomadlist.info.weather.type + ' — ' + nomadlist.info.weather.temperature.celsius + 'C');
        console.log('\r\n');
        console.log('/*-------------------------------- \n Scores \n--------------------------------*/');
        console.log('Nomad Score: ', nomadlist.scores.nomad_score);
        console.log('Life Score: ', nomadlist.scores.life_score);
        console.log('Free WiFi in City: ', nomadlist.scores.free_wifi_available);
        console.log('Nightlife: ', nomadlist.scores.nightlife);
        console.log('Places to Work From: ', nomadlist.scores.places_to_work);
        console.log('Air quality: ', nomadlist.scores.aircon);
        console.log('Safety: ', nomadlist.scores.safety);
        console.log('Fun: ', nomadlist.scores.leisure);
        console.log('Friendly to Foreigners: ', nomadlist.scores.friendly_to_foreigners);
        console.log('Racial Tolerance: ', nomadlist.scores.racism);
        console.log('Gay Friendly: ', nomadlist.scores.lgbt_friendly);
        console.log('Female Friendly: ', nomadlist.scores.female_friendly);
        console.log('\r\n');
        console.log('/*-------------------------------- \n Costs \n--------------------------------*/');
        console.log('Local Cost of Living: ', '$' + nomadlist.cost.local.USD);
        console.log('NomadCost: ', '$' + nomadlist.cost.nomad.USD);
        console.log('Expat Cost of Living: ', '$' + nomadlist.cost.expat.USD + '/m');
        console.log('Hotel Room: ', '$' + nomadlist.cost.hotel.USD + '/d');
        console.log('Coworking Space: ', '$' + nomadlist.cost.coworking.monthly.USD + '/m');
        console.log('Airbnb Apartment: ', '$' + nomadlist.cost.airbnb_median.USD) + '/d';
        console.log('Coca-cola (0.3L): ', '$' + nomadlist.cost.non_alcoholic_drink_in_cafe.USD);
        console.log('Pint of beer (0.5L): ', '$' + nomadlist.cost.beer_in_cafe.USD);
        console.log('Cappucino: ', '$' + nomadlist.cost.coffee_in_cafe.USD);
      }
    }

    process.exit(0);
  });
}

program.parse(process.argv);
