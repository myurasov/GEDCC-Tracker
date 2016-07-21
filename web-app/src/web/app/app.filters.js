/**
 * Filters
 */

export default (app) => {

  /**
   * Use large strava userpics
   */
  app.filter('largePic', () => v => {
    if (v) {
      return v.replace(/medium\.jpg$/, 'large.jpg');
    }
  })

};
