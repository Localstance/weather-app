var forecastModule = (function () {
  function getCityData(cities) {
    var i;
    var isLast;
    for (i = 0; i < cities.length; i++) {
      isLast = false;
      if (i === cities.length - 1) {
        isLast = true;
      }
      /* eslint-disable */
      (function (i, isLast, cities) {
        $.getJSON('https://api.forecast.io/forecast/148bac64e86bb59def9de83ced4585e0/'
            + cities[i].lat + ',' + cities[i].lng + '?callback=?').done(function (data) {
              var citiesCollectionModule = require('../models/citiesCollection');
              citiesCollectionModule.handleResponse(data, cities, i, isLast);
        });
      }(i, isLast, cities));
      /* eslint-enable */
    }
  }

  return {
    getCityData: getCityData
  };
})();

module.exports = forecastModule;
