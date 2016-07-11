var utils = require('../utils/utils');
var citiesList = require('../views/citiesListView');
var citiesGallery = require('../views/citiesGalleryListView');
var forecastModule = require('../utils/forecast');

var citiesCollectionModule = (function () {
  var placesCollection = [];

  function deleteCities(placeIdCollection) {
    var citiesCollection = utils.getFromStorage('citiesCollection');
    var citiesList = require('../views/citiesListView'); // eslint-disable-line
    var i;
    var j;
    for (i = 0; i < placeIdCollection.length; i++) {
      for (j = 0; j < citiesCollection.length; j++) {
        if (placeIdCollection[i] === citiesCollection[j].place_id) {
          citiesCollection.splice(j, 1);
        }
      }
    }
    utils.saveToStorage('citiesCollection', citiesCollection);
    citiesList.render();
    citiesGallery.slider.reloadSlider();
    citiesGallery.render();
  }

  function handleResponse(data, cities, i, isLast) {
    var collection = utils.getFromStorage('citiesCollection');
    var cityObj = cities[i];
    cityObj.forecast = data;
    collection.push(cityObj);
    utils.saveToStorage('citiesCollection', collection);
    if (isLast) {
      citiesList = require('../views/citiesListView'); // eslint-disable-line
      citiesGallery.render();
      citiesList.render();
      return true;
    }
    return true;
  }

  function setPredictionCollection(collection) {
    placesCollection = collection;
  }

  /*citiesCollection model*/
  function collectData() {
    var citiesCollection = [];
    var checkedPlaces = $('.places-list').find(':checked').closest('li');
    var i;
    var j;
    var place;
    var cityName;
    for (i = 0; i < checkedPlaces.length; i++) {
      place = checkedPlaces[i];
      cityName = $(place).attr('data-cityName');
      console.log(cityName); // eslint-disable-line
      for (j = 0; j < placesCollection.length; j++) {
        if (placesCollection[j].address.cityName === cityName) {
          citiesCollection.push(placesCollection[j]);
        }
      }
    }
    forecastModule.getCityData(citiesCollection);
  }

  return {
    deleteCities: deleteCities,
    setPredictionCollection: setPredictionCollection,
    handleResponse: handleResponse,
    collectData: collectData
  };
})();

module.exports = citiesCollectionModule;
