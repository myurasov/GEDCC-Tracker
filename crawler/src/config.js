/**
 * App config
 */

'use strict';

module.exports = {
  
  data_path: __dirname + '/../data',

  strava_club_id: '198722',
  strava_login: '-',
  strava_password: '-',

  webdriverio_options: {
    logLevel: 'verbose',
    waitforTimeout: 10000,
    desiredCapabilities: {
      browserName: 'chrome',
      version: '50'
    }
  }

};
