#!/usr/bin/env node

'use strict';

const commander = require('commander');
const packageJson = require('../package.json');

commander
  .version(packageJson.version)
  .command('get-athletes', 'Crawl Strava for club athletes')
  .command('get-activities', 'Crawl club athletes activities')
  .parse(process.argv);
