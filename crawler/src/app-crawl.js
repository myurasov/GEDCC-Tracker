/**
 * Crawls command
 */

'use strict';

const config = require('./config');
const commander = require('commander');
const packageJson = require('../package.json');
const CrawlCommand = require('./lib/CrawlCommand');
const parseBool = require('./lib/utils/parseBool');

commander
  .option('-d, --debug', 'debug output')
  .parse(process.argv);

// bootstrap command

const command = new CrawlCommand();

command.debug = parseBool(commander.debug);
command.version = packageJson.version;

command.stravaLogin = config.strava_login;
command.stravaPassword = config.strava_password;
command.stravaClubId = config.strava_club_id;
command.webdriverioOptions = config.webdriverio_options;

// go
command.run()
  .then(() => {
    process.exit(0);
  }, () => {
    process.exit(1);
  });