/**
 * Crawl command
 */

const AbstractCommand = require('./AbstractCommand');

class GetActivitiesCommand extends AbstractCommand {

  _run() {
    this._createClient();

    // login
    return this._loginToStrava()

      // done
      .end();
  }

}

module.exports = GetActivitiesCommand;
