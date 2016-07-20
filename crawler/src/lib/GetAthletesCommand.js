/**
 * Crawl command
 */

const fs = require('fs');
const path = require('path');
const webdriverio = require('webdriverio');
const promiseWhile = require('./utils/promiseWhile');
const AbstractCommand = require('./AbstractCommand');

class CrawlCommand extends AbstractCommand {

  constructor() {
    super();
  }

  _createClient() {
    this._client = webdriverio.remote(this.webdriverioOptions).init();
    return this;
  }

  _run() {
    return new Promise((resolve, reject) => {
      this._createClient();
      return this._client
        .url('https://www.strava.com/login')

        // login
        .setValue('#email', this.stravaLogin)
        .setValue('#password', this.stravaPassword)
        .submitForm('#login_form')

        // get athletes
        .then(() => this._getAthletes())
        .then(v => {
          if (!fs.existsSync(path.dirname(this.outputPath)))
            fs.mkdirSync(path.dirname(this.outputPath));
          fs.writeFileSync(this.outputPath, JSON.stringify(v));
          this._debug('Data file created: ', this.outputPath);
        })

        .end();
    });
  }

  /**
   * Get all athlete ids
   * @return {Promise}
   * @private
   */
  _getAthletes() {
    let page = 1,
      stop = false,
      athletes = new Set();

    return new Promise((resolve, reject) => {
      promiseWhile(
        () => !stop,
        () => {
          return this._client
            .url(`https://www.strava.com/clubs/${this.stravaClubId}/members?page=${page++}`)
            .waitForExist('.list-athletes')
            .isVisible('.next_page.disabled').then(v => {
              if (v) stop = true;
            })
            .getHTML('.list-athletes')
            .then(v => {
              v = v.join('');
              const m = v.match(/\/athletes\/(\d+)/g);
              const a = m.map(v => v.match(/\d+/)[0]);
              a.forEach(v => athletes.add(v));
            })
        }
      ).then(() => {
        this._debug('Total athletes: ', athletes.size);
        resolve(Array.from(athletes.values()));
      }, reject);
    });
  }

  _extractAthletes(text) {
    const m = /\/athletes\/(\d+)/g.match(text);
    console.log(m);
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

  get outputPath() {
    return this._outputPath;
  }

  set outputPath(value) {
    this._outputPath = value;
  }

// </editor-fold>
}

module.exports = CrawlCommand;
