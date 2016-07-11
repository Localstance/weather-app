var precipitation = require('../plugins/precipitation');
var citiesGalleryItem = (function () {
  var currentCityIndex;
  var isRain;
  var cities = $('.bxslider');

  function togglePrecipitation() {
    currentCityIndex = cities.getCurrentSlide();
    if ($(cities).children().length > 0) {
      isRain = $(cities[currentCityIndex]).find('.weather-icon').hasClass('icon-rain');
      if (!isRain) {
        precipitation.start();
      } else {
        precipitation.stop();
      }
    }
  }

  return {
    togglePrecipitation: togglePrecipitation
  };
})();

module.exports = citiesGalleryItem;
