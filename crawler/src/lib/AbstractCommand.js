/**
 * Abstract command
 */

const fs = require('fs');
const c = require('colors');
const path = require('path');

class AbstractCommand {
  run() {
    return this._run()
      .then(() => this._debug('done'))
      .catch(e => console.error(e))
  }

  /**
   * @returns {Promise}
   * @private
   */
  _run() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  _writeOutput(data) {
    if (!fs.existsSync(path.dirname(this.outputPath))) {
      fs.mkdirSync(path.dirname(this.outputPath));
    }

    fs.writeFileSync(this.outputPath, JSON.stringify(data));
    this._debug('Data file created: ', this.outputPath);
  }

  /**
   * Output debug statement
   * @private
   */
  _debug() {
    if (this.debug) {
      const args = Array.prototype.slice.call(arguments);
      args.unshift(c.green('[debug:' + this.constructor.name + ']'));
      console.log.apply(this, args);
    }
  }

  // <editor-fold desc="Accessors" defaultstate="collapsed">

  get debug() {
    return !!this.__debug;
  }

  set debug(value) {
    this.__debug = !!value;
  }

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

module.exports = AbstractCommand;
