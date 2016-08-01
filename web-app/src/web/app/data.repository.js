/**
 * Data repo
 * @author Mikhail Yurasov <me@yurasov.me>
 */

export default /* @ngInject */ ($http, athletes_endpoint, activities_endpoint, teams_endpoint) => {

  let athletesData,
    athletesUpdateDate,
    activitiesData,
    activitiesUpdateDate,
    athletesTop,
    teamsData,
    teamsTop;

  function getAthletes() {
    return new Promise((resolve, reject) => {
      $http({
        method: 'GET',
        url: athletes_endpoint
      }).then(r => {
        athletesUpdateDate = new Date(r.headers('last-modified'));
        athletesData = r.data;
        resolve(r.data);
      }, reject)
    });
  }

  function getActivities() {
    return new Promise((resolve, reject) => {
      $http({
        method: 'GET',
        url: activities_endpoint
      }).then(r => {
        activitiesUpdateDate = new Date(r.headers('last-modified'));
        activitiesData = r.data;
        resolve(r.data);
      }, reject)
    });
  }

  /**
   * Get overall top
   * @return {Promise}
   */
  function getTop() {
    return new Promise((resolve, reject) => {
      Promise.all([getAthletes(), getActivities()]).then(getTeams)
        .then(() => {
          calculateTop();
          resolve({athletes: athletesTop, teams: teamsTop});
        }, reject);
    });
  }

  function calculateTop() {

    const teams = {};

    athletesTop = [];
    teamsTop = [];

    // iterate all athletes
    for (const athlete of Object.values(athletesData)) {

      const athleteActivities = Object.values(activitiesData[String(athlete.id)]);

      if (athleteActivities.length > 0) {
        // distance [mi]
        const miles = athleteActivities.map(v => v.distance).reduce((a, b) => a + b);

        // elapsed time [sec]
        const athleteTime = athleteActivities
          .map(v => {
            const t = v.pace.split(':');
            if (t.length === 2) { // min:sec
              return (parseInt(t[0]) * 60 + parseInt(t[1])) * miles;
            } else if (t.length === 3) { // hr:min:sec
              return (parseInt(t[0]) * 3600 + parseInt(t[1]) * 60 + parseInt(t[2])) * miles;
            } else {
              console.error('Can\'t parse pace:', v.pace);
              return 0;
            }
          })
          .reduce((a, b) => a + b);

        athletesTop.push({
          athlete,
          miles: miles,
          seconds: athleteTime
        });

        // team data
        if (athlete.team) {
          if (!teams[athlete.team]) teams[athlete.team] = {miles: 0, team: athlete.team}
          teams[athlete.team].miles += miles;
        }
      }
    }

    // sort athletes
    athletesTop.sort((a, b) => b.miles - a.miles);

    // sort teams
    teamsTop = Object.values(teams).sort((a, b) => b.miles - a.miles);
  }

  /**
   * Get teams
   * @return {Promise({team: [ids]})}
   */
  function getTeams() {
    return new Promise((resolve, reject) => {
      $http({
        method: 'GET',
        url: teams_endpoint
      }).then(r => {

        const csv = r.data
          .split('\n') // split lines
          .map(e => e.split(',').map(e => e.trim(e)))
          .map(e => ({name: e[0], id: e[1], team: e[2]})); // read

        csv.shift(); // remove header

        teamsData = {}; // leader: [member_ids]

        // connect to athlete ids
        for (const athlete of csv) {

          let id = athlete.id;

          // find athlete id by name
          if (!id) {
            const stravaAthlete = Object.values(athletesData)
              .find(v => v.name.toLowerCase() === athlete.name.toLowerCase());
            id = stravaAthlete ? stravaAthlete.id : null
            // console.log(`Strava ID ${id || 'NOT'} detected for: ${athlete.name}`); // !!!
          }

          if (id) {
            if (!teamsData[athlete.team]) teamsData[athlete.team] = [];
            teamsData[athlete.team].push(id);

            // save team to athlete
            if (athletesData[id]) athletesData[id].team = athlete.team;
          }
        }

        resolve(teamsData);
      }, reject)
    });
  }

  return {
    getTop,
    getUpdatedAt: () => activitiesUpdateDate
  }

}
