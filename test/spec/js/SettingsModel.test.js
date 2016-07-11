describe('Settings model', function () {
  var settingsModule,
    utils;
  beforeEach(function () {
    settingsModule = require('../../../src/scripts/models/settingsModel');
    utils = require('../../../src/scripts/utils/utils');
  });
  it('toggleTemperature must be defined', function () {
    expect(settingsModule.toggleTemperature).toBeDefined();
  });
  it('must call saveToStorage', function () {
    var targetBtn = $('.fahrenheit');
    spyOn(utils, 'saveToStorage');
    settingsModule.toggleTemperature(targetBtn);
    expect(utils.saveToStorage).toHaveBeenCalled();
  });
  it('must perform right save to storage', function () {
    var e = {},
      tempFromStorage,
      setF = true,
      setC = false; /*mock for test*/

    e.target = $('.celsius');

    settingsModule.toggleTemperature(e, setF);
    tempFromStorage = JSON.parse(utils.getFromStorage('temp'));
    expect(tempFromStorage.temp).toBe('F');

    settingsModule.toggleTemperature(e, setC);
    tempFromStorage = JSON.parse(utils.getFromStorage('temp'));
    expect(tempFromStorage.temp).toBe('C');
  });
  it('setTemperature must be defined', function () {
    expect(settingsModule.setTemperature).toBeDefined();
  });
  it('setTemperature must set F temperature', function () {
    var settedTemp = settingsModule.setTemperature('F');
    expect(settedTemp).toBe('F');
  });
  it('setTemperature must set C temperature', function () {
    var settedTemp = settingsModule.setTemperature('C');
    expect(settedTemp).toBe('C');
  });
});
