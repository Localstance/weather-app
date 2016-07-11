var sun = (function () {
  var chord = document.body.getBoundingClientRect().width;
  var segmentHeight = document.body.getBoundingClientRect().height / 2;
  var radius = (segmentHeight / 2) + ((chord * chord) / (segmentHeight * 8));
  var segmentDeg = 146;
  var sunRiseSunDeg = 17; // eslint-disable-line
  var sunsetSunDeg = 163; // eslint-disable-line
  var body = $('body');

  $('.sun-handler').css({
    bottom: -(radius - segmentHeight),
    width: radius
  });

  function setSunPosition(sunrise, sunset, currentTime) {
    var daylightHours = parseFloat(sunset) - parseFloat(sunrise);
    var degPerHour = segmentDeg / daylightHours;
    var timeFormSunrise = parseFloat(currentTime) - parseFloat(sunrise);
    var currentDeg = (degPerHour * timeFormSunrise); // maybe add sunRiseSunDeg? calculate.
    $('.sun-handler').css('transform', ('rotate(' + currentDeg + 'deg)'));
  }

  function setSunPositionOfCurrentCity(index) {
    var currentCityIndex = index;
    var cities = $('.bxslider').find('.weather-wrapper');
    var currentCityTime;
    var currentCitySunrise;
    var currentCitySunset;
    if ($(cities).children().length > 0) {
      currentCityTime = $(cities[currentCityIndex]).find('.current-time').html();
      currentCitySunrise = $(cities[currentCityIndex]).find('.sunrise-data').html();
      currentCitySunset = $(cities[currentCityIndex]).find('.sunset-data').html();
      currentCityTime = currentCityTime.replace(':', '.');
      currentCitySunrise = currentCitySunrise.replace(':', '.');
      currentCitySunset = currentCitySunset.replace(':', '.');
      setSunPosition(currentCitySunrise, currentCitySunset, currentCityTime);
      changeBg(currentCityTime);
    }
  }

  function changeBg(time) {
    var timesOfDay = checkTimes(time);
    $(body).animate({
      background: timesOfDay.color
    }, 'fast', function () {
      $(body).removeAttr('class').addClass(timesOfDay.name);//morning/evening/day/night
    });
  }

  function checkTimes(time) {
    var hours = Math.round(time.slice(0, 2));
    if (hours <= 6) {
      return {
        name: 'night',
        color: '#090b22'
      };
    } else if (hours <= 12) {
      return {
        name: 'morning',
        color: '#166eef'
      };
    } else if (hours <= 18) {
      return {
        name: 'day',
        color: '#ff4200'
      };
    } else {
      return {
        name: 'evening',
        color: '#000e29'
      };
    }
  }

  return {
    setSunPosition: setSunPosition,
    setSunPositionOfCurrentCity: setSunPositionOfCurrentCity,
    changeBg: changeBg
  };
})();

module.exports = sun;
