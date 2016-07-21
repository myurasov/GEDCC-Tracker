/**
 * Data repo
 * @author Mikhail Yurasov <me@yurasov.me>
 */

export default /* @ngInject */ ($http, athletes_endpoint, activities_endpoint) => {

  let athletesData, activitiesData, athletes = [];

  function getAthletes() {
    return new Promise((resolve, reject) => {
      $http({
        method: 'GET',
        url: athletes_endpoint
      }).then(r => {
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
      athletes = [];

      getAthletes().then(getActivities)
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

              athletes.push({
                athlete,
                totalDistanceMi: athleteDistance,
                totalTimeSec: athleteTime
              });
            }
          }

          athletes.sort((a, b) => b.totalDistanceMi - a.totalDistanceMi);
          resolve(athletes);

        }, reject);
    });
  }

  return {
    getAthletes,
    getActivities,
    getTop
  }

}
