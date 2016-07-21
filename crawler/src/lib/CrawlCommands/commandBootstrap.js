/**
 * Bootstrap a command
 */

const commander = require('commander');
const parseBool = require('./../utils/parseBool');
const packageJson = require('../../../package.json');
const config = require('../../config.local.js') || require('../../config');

module.exports = (command, options) => {

  commander
    .option('-d, --debug', 'debug output')
    .option('-D, --ddebug', 'debug output (more)')
    .parse(process.argv);

  command.debug = parseBool(commander.debug);
  command.version = packageJson.version;

  command.stravaLogin = config.strava_login;
  command.stravaPassword = config.strava_password;
  command.stravaClubId = config.strava_club_id;
  command.webdriverioOptions = config.webdriverio_options;
  command.outputPath = config.data_path + '/' + options.out;

  if (parseBool(commander.ddebug)) {
    command.webdriverioOptions.logLevel = 'verbose';
  }

  // go
  command.run()
    .then(() => {
      process.exit(0);
    }, () => {
      process.exit(1);
    });

};