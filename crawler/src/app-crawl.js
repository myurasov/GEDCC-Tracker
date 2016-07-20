/**
 * Crawls command
 */

'use strict';

const fs = require('fs');
const config = require('./config.local') || require('./config');
const commander = require('commander');
const packageJson = require('../package.json');
const CrawlCommand = require('./lib/CrawlCommand');
const parseBool = require('./lib/utils/parseBool');

commander
  .option('-d, --debug', 'debug output')
  .option('-D, --ddebug', 'debug output (more)')
  .parse(process.argv);

// bootstrap command

const command = new CrawlCommand();

command.debug = parseBool(commander.debug);
command.version = packageJson.version;

command.stravaLogin = config.strava_login;
command.stravaPassword = config.strava_password;
command.stravaClubId = config.strava_club_id;
command.webdriverioOptions = config.webdriverio_options;
command.outputPath = config.data_path + '/athletes.json';

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
