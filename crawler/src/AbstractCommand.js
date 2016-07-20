/**
 * Abstract command
 */

class AbstractCommand {
  /**
   * @returns {Promise}
   */
  run() {
    return new Promise((resolve, reject) => {
      this._run()
        .then(() => {
          // xxx
          console.log('done');
        })
        .catch(e => {
          console.error(e);
        })
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
}

module.exports = AbstractCommand;
