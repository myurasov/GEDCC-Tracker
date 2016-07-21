/**
 * Crawls command
 */

'use strict';

const GetAthletesCommand = require('./lib/CrawlCommands/GetAthletesCommand');
const commandBootstrap = require('./lib/CrawlCommands/commandBootstrap');

// bootstrap command
const command = new GetAthletesCommand();
commandBootstrap(command, {out: 'athletes.json'});
