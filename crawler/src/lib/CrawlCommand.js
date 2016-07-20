/**
 * Crawl command
 */

const AbstractCommand = require('./AbstractCommand');
const webdriverio = require('webdriverio');

class CrawlCommand extends AbstractCommand {

  constructor() {
    super();
  }

  _createClient() {
    this._client = webdriverio.remote(this.webdriverioOptions);
    return this;
  }

  _run() {
    return new Promise((resolve, reject) => {
      this._createClient();
      return this._client
        .init()
        .url('http://strava.com')
        .windowHandleMaximize()
    });
  }

  // <editor-fold desc="Accessors" defaultstate="collapsed">

  get stravaLogin() {
    return this._stravaLogin;
  }

  set stravaLogin(value) {
    this._stravaLogin = value;
  }

  get stravaPassword() {
    return this._stravaPassword;
  }

  set stravaPassword(value) {
    this._stravaPassword = value;
  }

  get stravaClubId() {
    return this._stravaClubId;
  }

  set stravaClubId(value) {
    this._stravaClubId = value;
  }

  get webdriverioOptions() {
    return this._webdriverioOptions;
  }

  set webdriverioOptions(value) {
    this._webdriverioOptions = value;
  }

  // </editor-fold>
}

module.exports = CrawlCommand;