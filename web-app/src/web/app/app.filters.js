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

  /**
   * Format name
   */
  app.filter('name', () => v => {
    if (v) {
      return v.split(' ').map(w => w.substr(0, 1).toUpperCase() + w.substr(1)).join(' ');
    }
  })

};
