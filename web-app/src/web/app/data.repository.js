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
    teamsData;

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
      athletesTop = [];

      getAthletes().then(getActivities).then(getTeams)
        .then(() => {
          // iterate all athletes
          for (const athlete of Object.values(athletesData)) {

            const athleteActivities = Object.values(activitiesData[String(athlete.id)]);

            if (athleteActivities.length > 0) {
              // distance [mi]
              const athleteDistance = athleteActivities.map(v => v.distance).reduce((a, b) => a + b);

              // elapsed time [sec]
              const athleteTime = athleteActivities
                .map(v => {
                  const t = v.pace.split(':');
                  return (parseInt(t[0]) * 60 + parseInt(t[1])) * athleteDistance;
                })
                .reduce((a, b) => a + b);

              athletesTop.push({
                athlete,
                totalDistanceMi: athleteDistance,
                totalTimeSec: athleteTime
              });
            }
          }

          athletesTop.sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
          resolve({athletes: athletesTop});

        }, reject);
    });
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
          .map(e => e.split(','))
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
