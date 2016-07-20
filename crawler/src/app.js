#!/usr/bin/env node

'use strict';

const commander = require('commander');
const packageJson = require('../package.json');

commander
  .version(packageJson.version)
  .command('crawl', 'Crawl Strava for club totals')
  .parse(process.argv);
