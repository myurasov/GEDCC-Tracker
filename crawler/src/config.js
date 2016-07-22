/**
 * App config
 */

'use strict';

module.exports = {

  data_path: __dirname + '/../data',

  strava_club_id: '198722',
  strava_login: '-',
  strava_password: '-',

  start_week: 201625,
  end_week: 201633,

  webdriverio_options: {

    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,

    logLevel: 'silent',
    waitforTimeout: 10000,
    desiredCapabilities: {
      browserName: 'chrome',
      version: '50',
      chromeOptions: {
        prefs: {
          profile: {
            default_content_setting_values: {images: 2}
          }
        }
      }
    },
  }

};
