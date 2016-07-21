/**
 * Crawl command
 */

const AbstractCommand = require('./AbstractCommand');
const promiseWhile = require('./utils/promiseWhile');
const dateformat = require('dateformat');

class GetActivitiesCommand extends AbstractCommand {

  constructor() {
    super();
    this._data = {};
  }

  _run() {
    this._createClient();

    // login
    return this._loginToStrava()

      .then(() => this._getAthletesStats())
      .then(() => this._writeOutput(this._data))

      .pause(1e6)

      // done
      .end();
  }

  _getAthletesStats() {
    const athletes = require('../../data/athletes.json');
    if (!athletes) throw new Error('Athletes file not found');

    return promiseWhile(
      () => athletes.length > 0,
      () => {
        this._debug('Athletes left: ', athletes.length)
        return this._getAthleteStats(athletes.shift())
      }
    );
  }

  /**
   * Get stats per athlete
   * @param athleteId
   * @return {Priomise}
   * @private
   */
  _getAthleteStats(athleteId) {
    athleteId = String(athleteId);
    this._data[athleteId] = {};

    // current week
    let week = Math.min(201600 + parseInt(dateformat(new Date(), 'W')), this.endWeek);

    return promiseWhile(
      () => week >= this.startWeek,
      () => {

        return this._client

          .url(`https://www.strava.com/athletes/${athleteId}#interval` +
               `?interval=${week--}&interval_type=week&chart_type=miles&year_offset=0`)
          .pause(2000)
          .isVisible('.activity.feed-entry')
          .then(v => {
            if (v) {

              return this._client
                .getHTML('.activity.feed-entry')
                .then(activities => {

                  for (const a of activities) {

                    if (a.match(/icon-run/) /* intereste din runs only */) {
                      if (a.match(/<span class="unit">/) /* otherwise it's a blank one */) {

                        // check if distance is in miles
                        if (!a.match(/<span class="unit">mi/) /* distance */ || !a.match(/<span class="unit">\/mi/) /* pace */) {
                          console.log(a);
                          throw new Error('Only miles are supported as units');
                        }

                        const activityId = a.match(/Activity-(\d+)/)[1];
                        const distance = parseFloat(a.match(/<li title="Distance">([\d\.]+)/)[1]); // [mi]
                        const pace = a.match(/<li title="Average Pace">([\d\:]+)/)[1]; // [min/mi]

                        this._data[athleteId][activityId] = {activityId, distance, pace};
                      }
                    }
                  }
                });
            }
          })
      }
    ).then(() => {
      this._debug('Athlete data:', athleteId, this._data[athleteId]);
    });
  }

  // <editor-fold desc="Accessors" defaultstate="collapsed">

  get startWeek() {
    return this._startWeek;
  }

  set startWeek(value) {
    this._startWeek = value;
  }

  get endWeek() {
    return this._endWeek;
  }

  set endWeek(value) {
    this._endWeek = value;
  }

  // </editor-fold>
}

module.exports = GetActivitiesCommand;
