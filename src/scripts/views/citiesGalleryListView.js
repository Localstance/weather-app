var _ = require('../vendor/underscore.js');
var sun = require('../plugins/sun.js');
var settingsModule = require('../models/settingsModel.js');
var utils = require('../utils/utils.js');
var forecastModule = require('../utils/forecast');
var citiesGallery = (function () {
  var elm = $('.bxslider');
  var underTmpl;
  var tmplData;
  var addToListBtn = $('.add-to-list-btn');
  var noResult = $('.no-result-msg');
  var delBtn = $('.delete-btn');
  var refreshBtn = $('.refresh-icon'); //eslint-disable-line
  var slider = $(elm).bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    onSlideAfter: function () {
      var index = slider.getCurrentSlide();
      sun.setSunPositionOfCurrentCity(index);
      //citiesGalleryItem.togglePrecipitation();
    }
  });

  $.ajax({
    url: '././templates/gallery-template.html',
    type: 'GET'
  }).done(function (data) {
    underTmpl = data;
  });
  /* eslint-disable */
  /* working on feature */
  function refresh() {
    var citiesCollection = utils.getFromStorage('citiesCollection');
    utils.clearStorage();
    forecastModule.getCityData(citiesCollection);
  }
  /* eslint-enable */
  function reRender() {
    $.ajax({
      url: '././templates/gallery-template.html',
      type: 'GET'
    }).done(function (data) {
      underTmpl = data;
      render();
    });
  }

  function render() {
    var citiesCollection = utils.getFromStorage('citiesCollection');
    var compiledTmpl;
    var i;
    var currentDateObj;
    var sunriseTime;
    var sunsetTime;
    var tempSettings = utils.getFromStorage('temp');

    if (underTmpl === undefined) {
      return reRender();
    }
    $(elm).children().remove();

    for (i = 0; i < citiesCollection.length; i++) {
      currentDateObj = new Date(citiesCollection[i].forecast.currently.time * 1000);
      sunriseTime = new Date(citiesCollection[i].forecast.daily.data[0].sunriseTime * 1000);
      sunsetTime = new Date(citiesCollection[i].forecast.daily.data[0].sunsetTime * 1000);

      tmplData = {};
      tmplData.lat = citiesCollection[i].lat;
      tmplData.lng = citiesCollection[i].lng;
      tmplData.placeId = citiesCollection[i].place_id;
      tmplData.cityName = citiesCollection[i].address.cityName;
      tmplData.current_time = utils.getCompiledTime(
          citiesCollection[i].forecast.currently.time,
          citiesCollection[i].forecast.offset
      );
      tmplData.current_day = utils.getDayName(currentDateObj.getDay());
      tmplData.current_month = utils.getMonthName(currentDateObj.getMonth());
      tmplData.current_date = currentDateObj.getDate();
      tmplData.weather_icon = utils.getWthIconClassName(citiesCollection[i].forecast.currently.icon);
      tmplData.current_temp_f = parseInt(citiesCollection[i].forecast.currently.temperature, 10);
      tmplData.current_temp_c = utils.convertToCelcium(citiesCollection[i].forecast.currently.temperature);
      tmplData.weather_now_text = citiesCollection[i].forecast.currently.summary;
      tmplData.moon_icon = utils.getMoonIconClassName(citiesCollection[i].forecast.daily.data[0].moonPhase);

      if (!isNaN(sunriseTime) || !isNaN(sunsetTime)) {
        tmplData.sunrise_time = utils.getCompiledTime(
            citiesCollection[i].forecast.daily.data[0].sunriseTime,
            citiesCollection[i].forecast.offset
        );
        tmplData.sunset_time = utils.getCompiledTime(
            citiesCollection[i].forecast.daily.data[0].sunsetTime,
            citiesCollection[i].forecast.offset
        );
      } else {
        tmplData.sunrise_time = 'Not available';
        tmplData.sunset_time = 'Not available';
      }

      tmplData.hourly_data = utils.parseDetailedData(
          citiesCollection[i].forecast.hourly.data.slice(1, 26),
          citiesCollection[i].forecast.offset);
      tmplData.humidity = Math.round(citiesCollection[i].forecast.currently.humidity * 100);
      tmplData.windSpeed = Math.round((citiesCollection[i].forecast.currently.windSpeed));
      tmplData.week_data = utils.parseDetailedData(
          citiesCollection[i].forecast.daily.data.slice(0, 7),
          citiesCollection[i].forecast.offset);

      compiledTmpl = _.template(underTmpl, tmplData);

      $(elm).append(compiledTmpl);
    }

    sun.setSunPositionOfCurrentCity(slider.getCurrentSlide());

    slider.reloadSlider();

    initScrollBar();

    if (Array.isArray(tempSettings)) {
      tempSettings = { temp: 'C' };
    } else {
      tempSettings = JSON.parse(tempSettings);
    }

    settingsModule.setTemperature(tempSettings.temp);
    //weekLists = $('.week-list');
    refreshBtn = $('.refresh-icon');
    /*$(refreshBtn).each(function () {
      $(this).on('click', refresh);
    });*/
    $(delBtn).removeClass('hooded');
    $(addToListBtn).addClass('hooded');
    $(noResult).addClass('hooded');
    return true;
  }

  function initScrollBar() {
    $('.weather-today-each-hour').mCustomScrollbar({
      axis: 'x',
      advanced:{
        autoExpandHorizontalScroll: true
      }
    });
  }

  return {
    render: render,
    initScrollBar: initScrollBar,
    slider: slider
  };
})();

module.exports = citiesGallery;
