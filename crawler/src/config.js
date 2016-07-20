/**
 * App config
 */

'use strict';

module.exports = {

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
