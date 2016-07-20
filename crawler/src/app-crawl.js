/**
 * Crawls command
 */

'use strict';

const commander = require('commander');
const packageJson = require('../package.json');
const CrawlCommand = require('./CrawlCommand');
const parseBool = require('./lib/utils/parseBool');

commander
  .option('-d, --debug', 'debug output')
  .parse(process.argv);

// bootstrap command

const command = new CrawlCommand();

command.debug = parseBool(commander.debug);
command.version = packageJson.version;

// go
command.run()
  .then(() => {
    process.exit(0);
  }, () => {
    process.exit(1);
  });