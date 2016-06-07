// const spinner = require('./spinner');
//
// const api = (options) => {
//   if(!options[0]) {
//     program.help();
//   } else if(program.cities) {
//     spinner.start();
//
//     got('https://nomadlist.com/api/v2/list/cities')
//       .then(response => {
//         spinner.stop();
//         console.log(response.body);
//
//         process.exit(0);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   } else if(program.remoteok) {
//     spinner.start();
//
//     got('https://remoteok.io/index.json')
//       .then(response => {
//         spinner.stop();
//         console.log(response.body);
//
//         process.exit(0);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//
//   return options[0];
// }
//
// module.exports = api;
