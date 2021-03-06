var load = require('dynload');

module.exports = analytics;

function analytics(pageview, propertyId, fields) {
  // shift params if pageview is not defined
  if (typeof pageview !== 'boolean') {
    fields = propertyId;
    propertyId = pageview;
    pageview = true;
  }

  // shif params if propertyId is not defined
  if (typeof propertyId !== 'string') {
    fields = propertyId;
    propertyId = undefined;
  }

  // if propertyId is not defined try find it in data-ga-property-id
  if (!propertyId) {
    propertyId = document.body.dataset.gaPropertyId;
    if (!propertyId) {
      return;
    }
  }

  function ga() {
    var q = window.ga.q = window.ga.q || [];
    q.push(arguments);
  }

  window.GoogleAnalyticsObject = 'ga';
  window.ga = window.ga || ga;
  window.ga.l = 1 * new Date();

  ga('create', propertyId);
  ga('set', 'transport', 'beacon');

  if (fields) {
    Object.keys(fields).forEach(function(name) {
      ga('set', name, fields[name]);
    });
  }

  if (pageview) {
    ga('send', 'pageview');
  }

  return load('https://www.google-analytics.com/analytics.js');
}
