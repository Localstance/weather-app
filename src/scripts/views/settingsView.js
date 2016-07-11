var settingsModule = require('../models/settingsModel');
var settingsView = (function () {
  function init() {
    $('.switch-units').on('click', settingsModule.toggleTemperature);
  }

  return {
    init: init
  };
})();

module.exports = settingsView;
