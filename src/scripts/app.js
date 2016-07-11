var App = {
  model: {},
  view: {},
  plugin: {}
};
App.view.citiesGallery = require('./views/citiesGalleryListView');
App.view.citiesList = require('./views/citiesListView');
App.view.settingsView = require('./views/settingsView');
App.model.citiesCollection = require('./models/citiesCollection');
App.model.settingsModel = require('./models/settingsModel');
//App.plugin.precipitation = require('./plugins/precipitation');
App.plugin.sun = require('./plugins/sun');
App.utils = require('./utils/utils');
App.autocomplete = require('./utils/autocomplete');
App.init = function () {
  App.view.citiesGallery.render();
  App.view.citiesList.render();
  App.autocomplete.initAutocomplete();
  App.view.settingsView.init();
};

$(window).on('load', App.init);
//$(window).on('resize', App.plugin.sun.setSunPositionOfCurrentCity);

module.exports = App;
