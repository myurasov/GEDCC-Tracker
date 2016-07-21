/**
 * App config
 */

'use strict';

module.exports = {

  data_path: __dirname + '/../data',

  strava_club_id: '198722',
  strava_login: 'me@yurasov.me',
  strava_password: '-',

  start_week: 201625,
  end_week: 201633,

  webdriverio_options: {
    logLevel: 'silent',
    waitforTimeout: 10000,
    desiredCapabilities: {
      browserName: 'chrome',
      version: '50'
    }
  }

};
