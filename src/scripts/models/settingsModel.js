var $ = require('../vendor/jquery-2.1.4.js');
var utils = require('../utils/utils');

var settingsModule = (function () {
  var btnF = $('.fahrenheit');
  var btnC = $('.celsius');

  function toggleTemperature(e, setF) {
    var elementsC = $('.temp-c');
    var elementsF = $('.temp-f');
    var isF = setF || $(e.target).hasClass('fahrenheit');

    if (isF) {
      $(btnF).addClass('active-temp');
      $(btnC).removeClass('active-temp');
      $(elementsC).addClass('hooded');
      $(elementsF).removeClass('hooded');
      utils.saveToStorage('temp', JSON.stringify({ temp: 'F' }));
    } else {
      $(btnC).addClass('active-temp');
      $(btnF).removeClass('active-temp');
      $(elementsC).removeClass('hooded');
      $(elementsF).addClass('hooded');
      utils.saveToStorage('temp', JSON.stringify({ temp: 'C' }));
    }
  }

  function setTemperature(temp) {
    var elementsC = $('.temp-c');
    var elementsF = $('.temp-f');
    if (temp === 'F') {
      $(btnF).addClass('active-temp');
      $(btnC).removeClass('active-temp');
      $(elementsC).addClass('hooded');
      $(elementsF).removeClass('hooded');
      return 'F';
    } else {
      $(btnC).addClass('active-temp');
      $(btnF).removeClass('active-temp');
      $(elementsC).removeClass('hooded');
      $(elementsF).addClass('hooded');
      return 'C';
    }
  }

  return {
    toggleTemperature: toggleTemperature,
    setTemperature: setTemperature
  };
})();

module.exports = settingsModule;
