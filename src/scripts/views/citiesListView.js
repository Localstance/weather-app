var _ = require('../vendor/underscore.js');
var utils = require('../utils/utils.js');
var settingsModule = require('../models/settingsModel.js');
var citiesCollectionModule = require('../models/citiesCollection');
var citiesGallery = require('./citiesGalleryListView');

var citiesList = (function () {
  var elm = $('.places-list ul');

  var underTemplate;
  var compiledTmpl;
  var tmplData;
  var autoCompleteTemplate;
  var addBtn = $('.add-btn');
  var delBtn = $('.delete-btn');
  var addToListBtn = $('.add-to-list-btn');
  var autocompleteField = $('.autocomplete');
  var autocompleteInput = $(autocompleteField).find('input');
  var placesList = $('.places-list').find('ul');
  var noResult = $('.no-result-msg');

  $.ajax({
    url: '././/templates/places-list-item.html',
    type: 'GET'
  }).done(function (data) {
    underTemplate = data;
  });

  $.ajax({
    url: '././templates/places-list-prediction-item.html',
    type: 'GET'
  }).done(function (data) {
    autoCompleteTemplate = data;
  });

  /* Red button and open/close field. Show/hide chosen places */
  $(addBtn).on('click', function () {
    $(autocompleteField).toggleClass('hidden');
    $(this).toggleClass('active-btn');
    hideChoosenPlaces(placesList);
  });

  $(addToListBtn).on('click', function () {
    $(autocompleteField).addClass('hidden');
    $(noResult).addClass('hooded');
    $(autocompleteInput).val('');
    $(addBtn).removeClass('active-btn');
    citiesCollectionModule.collectData();
    hideChoosenPlaces(placesList);
    $(placesList).find('.temp-prediction').remove();
    citiesGallery.render();
  });

  $(delBtn).on('click', function () {
    var delCollection = $('.places-list').find(':checked').closest('li');
    var placeIdCol = [];
    var i;
    for (i = 0; i < delCollection.length; i++) {
      placeIdCol.push($(delCollection[i]).attr('data-place-id'));
    }
    citiesCollectionModule.deleteCities(placeIdCol);
    //sun.setSunPositionOfCurrentCity();
    //citiesGalleryItem.togglePrecipitation();
  });

  $('.open-menu-btn').on('click', function () {
    $('aside').removeClass('hide').addClass('show');
  });

  $('aside .menu-btn').on('click', function () {
    $('aside').removeClass('show').addClass('hide');
  });

  $(placesList).on('click', 'li', function (e) {
    var checkbox = $(e.target).find('.place-checkbox-label')[0];
    $(checkbox).trigger('click');
  });

  $('.slider-show-more').slider({
    step: 1,
    range: 'min',
    value: 7,
    min: 1,
    max: 7,
    change: function () {
      reDrawWeekList($(this).slider('option', 'value'));
    }
  });

  $('.slider-update-time').slider({
    step: 1,
    range: 'min',
    value: 15,
    min: 1,
    max: 60,
    change: function () {
      $('.settings-update-every').find('.quantity')
          .html($(this).slider('option', 'value'));
    }
  });

  function hideChoosenPlaces(list) {
    $(list).find('li').each(function () {
      $(this).toggleClass('hooded');
    });
    $(noResult).toggleClass('hooded');
  }

  /*Show weather for*/
  function reDrawWeekList(daysToShow) {
    var weekLists = $('.week-list');
    var i;
    var j;
    var days;
    $('.settings-show-for').find('.quantity').html(daysToShow);
    for (i = 0; i < weekLists.length; i++) {
      days = $(weekLists[i]).find('li');
      for (j = 0; j < days.length; j++) {
        $(days[j]).removeClass('hidden');
        if (j >= daysToShow) {
          $(days[j]).addClass('hidden');
        }
      }
    }
  }

  $('.places-list').mCustomScrollbar({
    axis: 'y',
    advanced:{
      autoExpandHorizontalScroll: true
    }
  });

  function renderAutocompleteList(collection) {
    var compiledTmpl;
    var tmplData;
    var i;
    var elm = $('.places-list').find('ul');
    var hoodLstnr = function () {
      $(delBtn).addClass('hooded');
      $(addToListBtn).removeClass('hooded');
    };

    citiesCollectionModule.setPredictionCollection(collection);

    $(elm).find('.temp-prediction').remove();

    for (i = 0; i < collection.length; i++) {
      tmplData = {};
      tmplData.classTemp = 'temp-prediction';
      tmplData.cityName = collection[i].address.cityName;
      tmplData.countryName = collection[i].address.countryName;
      tmplData.place_id = collection[i].place_id;
      compiledTmpl = _.template(autoCompleteTemplate, tmplData);
      $(elm).append(compiledTmpl);
      $(elm).find('.place-checkbox').on('change', hoodLstnr);
    }
    $(noResult).addClass('hooded');
    /*$(elm).on('click', 'li', function(e){
     e.preventDefault();
     e.stopPropagation();
     var checkbox = $(this).find('.place-checkbox'),
     isChecked = $(checkbox).prop('checked');
     if(isChecked){
     $(checkbox).prop('checked', false);
     } else {
     $(checkbox).prop('checked', true);
     }
     });*/
  }

  function reRender() {
    $.ajax({
      url: '././/templates/places-list-item.html',
      type: 'GET'
    }).done(function (data) {
      underTemplate = data;
      render();
    });
  }

  function render() {
    var citiesCollection = utils.getFromStorage('citiesCollection');
    var tempSettings = utils.getFromStorage('temp');
    var i;

    if (underTemplate === undefined) {
      return reRender();
    }
    elm = $('.places-list ul');

    if (Array.isArray(tempSettings)) {
      tempSettings = { temp: 'C' };
    } else {
      tempSettings = JSON.parse(tempSettings);
    }
    $(elm).children().remove();

    for (i = 0; i < citiesCollection.length; i++) {
      tmplData = {};
      tmplData.place_id = citiesCollection[i].place_id;
      tmplData.cityName = citiesCollection[i].address.cityName;
      tmplData.icon = utils.getWthIconClassName(citiesCollection[i].forecast.currently.icon);
      tmplData.currentTempF = parseInt(citiesCollection[i].forecast.currently.temperature, 10);
      tmplData.currentTempC = utils.convertToCelcium(citiesCollection[i].forecast.currently.temperature);
      tmplData.weatherNowText = citiesCollection[i].forecast.currently.summary;
      compiledTmpl = _.template(underTemplate, tmplData);
      $(elm).append(compiledTmpl);
    }

    settingsModule.setTemperature(tempSettings.temp);
    return true;
  }

  return {
    renderAutocompleteList: renderAutocompleteList,
    render: render
  };
})();

module.exports = citiesList;
