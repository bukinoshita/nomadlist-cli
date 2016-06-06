const got = require('got');

const api = options => {
    url: 'https://nomadlist.com/api/v2/list'
  , remoteOk: 'https://remoteok.io/index.json'
  , nomadlistUrl: 'https://nomadlist.com'

  , fetch: url => got(url, options)

  work() {
    return `${this.url}/work`;
  }

  collections() {
    return `${this.url}/collections`;
  }

  cities() {
    return `${this.url}/cities`;
  }

  remoteWork() {
    return `${this.remoteOk}`;
  }
}

module.exports = api;
