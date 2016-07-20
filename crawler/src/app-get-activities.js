/**
 * Crawls command
 */

'use strict';

const GetActivitiesCommand = require('./lib/GetActivitiesCommand');
const commandBootstrap = require('./lib/commandBootstrap');

// bootstrap command
const command = new GetActivitiesCommand();
commandBootstrap(command, {out: 'activities.json'});
