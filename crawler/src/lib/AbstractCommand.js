/**
 * Abstract command
 */

const c = require('colors');

class AbstractCommand {
  /**
   * @returns {Promise}
   */
  run() {
    return new Promise((resolve, reject) => {
      this._run()
        .then(() => {
          this._debug('done');
        })
        // .catch(e => {
        //   console.error(e);
        // })
    });
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

  // </editor-fold>
}

module.exports = AbstractCommand;
