/**
 * Crawl command
 */

const AbstractCommand = require('./AbstractCommand');

class GetActivitiesCommand extends AbstractCommand {
  _run() {
    return new Promise((resolve, reject) => {
      this._createClient();
      return this._client
        .url('https://www.strava.com/login')
        .end();
    });
  }
}

module.exports = GetActivitiesCommand;
