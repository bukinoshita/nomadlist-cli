'use strict'

const output = require('./output')

module.exports = (props, city = undefined) => {
  return {
    all: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info
      const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)

      console.log(nomadlist)
    },

    search: result => {
      const match = result.info.city.name.replace(/\s+/g, '-').toLowerCase()
      const search = city.toLowerCase()

      if (match === search) {
        const {info, cost} = result
        const {city, country, region, internet, weather} = info
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)

        console.log(nomadlist)
      }
    },

    cheap: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (cost.longTerm.USD < 750) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    internet: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (internet.speed.download > 15) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    work: result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.places_to_work > 0.4) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    safe: result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.safety > 0.4) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    warm: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (weather.temperature.celsius > 21) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    affordable: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (cost.longTerm.USD < 1250) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    mid: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (cost.longTerm.USD < 3000) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    expensive: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (cost.longTerm.USD > 3000) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    cold: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (weather.temperature.celsius < 20) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    mild: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (weather.temperature.celsius > 16 && weather.temperature.celsius < 25) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    hot: result => {
      const {info, cost} = result
      const {city, country, region, internet, weather} = info

      if (weather.temperature.celsius > 30) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    air: result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.aircon > 0.5) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    nightlife: result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.nightlife > 0.5) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    },

    friendly: result => {
      const {info, cost, scores} = result
      const {city, country, region, internet, weather} = info

      if (scores.friendly_to_foreigners > 0.5) {
        const nomadlist = output(city.name, country.name, region.name, internet.speed.download, cost.expat.USD, weather.temperature.celsius)
        console.log(nomadlist)
      }
    }
  }[props]
}
