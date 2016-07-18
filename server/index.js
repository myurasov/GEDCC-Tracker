/**
 * GE Digital Charity Challenge Tracker
 */

'use strict';

const conf = require('./conf');
const colors = require('colors');
const strava = require('strava-v3');
const promiseWhile = require('./lib/promise-while');

getAthletes(conf.club_id, conf.strava_token)

  .then((d) => {
    console.log(colors.cyan('Athletes in the club: ') + d.length);
  })

/**
 * Get club athletes
 * @returns {Promise}
 */
function getAthletes(clubId, accessToken) {
  const _getAthletes = (page) => {
    return new Promise((resolve, reject) => {
      strava.clubs.listMembers({
        id: clubId,
        access_token: accessToken,
        per_page: 200,
        page
      }, (e, d) => {
        if (e) reject(e);
        resolve(d);
      });
    });
  };

  let res = [], d = true, p = 0;

  return new Promise((resolve, reject) => {
    promiseWhile(
      () => d === true || d.length,
      () => {
        return _getAthletes(++p).then((r) => {
          d = r;
          d.forEach(e => res.push(e))
        })
      }
    ).then(() => resolve(res), reject)
  });
}


/**
 * Get athlete activities
 * @returns {Promise}
 */
function getAthletesActivities(athleteId, startTs, endTs) {
  return new Promise((resolve, reject) => {
  });
}
