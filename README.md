# Nomadlist CLI
> Get cities from nomadlist.com

<img src="screenshot.gif" width="404">

## Install:
```
$ npm install -g nomadlist-cli
```

## Usage:
```
$ nomadlist --help

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
```

## License
[MIT](https://raw.githubusercontent.com/BuKinoshita/nomadlist-cli/master/LICENSE) &copy; Bu Kinoshita

[API: Nomadlist](https://nomadlist.com)
