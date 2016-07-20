/**
 * App config
 */

'use strict';

module.exports = {

  club_id: '198722',

  webdriverio_options: {
    logLevel: 'silent',
    waitforTimeout: 10000,
    desiredCapabilities: {
      browserName: 'chrome',
      version: '50'
    }
  }
  
};
