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

  /**
   * Name to class
   */
  app.filter('classify', () => v => {
    if (v) {
      return v.replace(/ /g, '');
    }
  })

  /**
   * Name to team abbr
   */
  app.filter('teamify', () => v => {
    if (v) {
      return v.split(' ').map(w => w.substr(0, 1).toUpperCase()).join('');
    }
  })

};
