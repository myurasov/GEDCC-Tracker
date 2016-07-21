/**
 * Crawls command
 */

'use strict';

const commandBootstrap = require('./lib/commandBootstrap');
const config = require('./config.local') || require('./config');
const GetActivitiesCommand = require('./lib/GetActivitiesCommand');

// bootstrap command
const command = new GetActivitiesCommand();

command.startWeek = config.start_week;
command.endWeek = config.end_week;

commandBootstrap(command, {out: 'activities.json'});
