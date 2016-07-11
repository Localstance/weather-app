describe('Utils function spec', function () {
  var utils;
  beforeEach(function () {
    utils = require('../../../src/scripts/utils/utils');
  });
  it('getFromStorage must return right collection', function () {
    var collection = utils.getFromStorage('citiesCollection');
    var isArray = Array.isArray(collection);
    expect(typeof collection).toBe('object');
    expect(typeof collection).not.toBe(null);
    expect(typeof collection).not.toBe(undefined);
    expect(typeof collection).not.toBe('number');
    expect(collection.length).toBeGreaterThan(-1);
    expect(isArray).toBeTruthy();
    utils.clearStorage();
    collection = utils.getFromStorage('citiesCollection');
    expect(Array.isArray(collection)).toBeTruthy();
  });
  it('saveToStorage must save cities in right way', function () {
    var cities;
    utils.saveToStorage('citiesCollection', [{ cityName: 'Kharkiv' }, { cityName: 'Kyiv' }]);
    cities = utils.getFromStorage('citiesCollection');
    expect(cities.length).toBe(2);
    expect(cities[0].cityName).toBe('Kharkiv');
  });
  it('deleteFromStorage must delete selected city from storage', function () {
    var collection = utils.deleteFromStorage('citiesCollection', 1);
    expect(typeof collection).toBe('object');
    expect(typeof collection[0]).toBe('object');
    expect(collection.length).toBe(1);
    expect(collection[0].cityName).toBe('Kharkiv');
    expect(typeof collection[0].cityName).toBe('string');
  });
  it('clearStorage must delete all cities', function () {
    var collection;
    utils.saveToStorage('citiesCollection', [{ cityName: 'Kharkiv' }, { cityName: 'Kyiv' }]);
    utils.clearStorage();
    collection = utils.getFromStorage('citiesCollection');
    expect(utils.clearStorage).toBeDefined();
    expect(collection.length).toBe(0);
    spyOn(localStorage, 'clear');
    utils.clearStorage();
    expect(localStorage.clear).toHaveBeenCalled();
  });
  it('getCompiledTime must compile right time and throw errors', function () {
    var time;
    expect(function () {
      utils.getCompiledTime();
    }).toThrowError('Expect timestamp argument');
    expect(function () {
      utils.getCompiledTime('1465944481');
    }).toThrowError('Timestamp must be a number');
    expect(function () {
      utils.getCompiledTime(1465944481);
    }).not.toThrowError();
    time = utils.getCompiledTime(1465944481);
    expect(time).toBe('-2:48');
    time = utils.getCompiledTime(1466017200);
    expect(time).toBe('19:00');
    expect(typeof time).toBe('string');
    expect(typeof time).not.toBe(undefined);
  });
  it('getDayName must return right day names', function () {
    var dayName,
        i = 0;
    expect(utils.getDayName).toBeDefined();
    expect(function () {
      utils.getDayName();
    }).toThrowError('Expect day number argument');
    expect(function () {
      utils.getDayName('6');
    }).toThrowError('Expect day number argument typeof number');
    expect(function () {
      utils.getDayName(7);
    }).toThrowError('Week number must be in range from 0 to 6');
    dayName = utils.getDayName(1);
    expect(dayName).toBe('Monday');
    afterEach(function () {
      i++;
    });
    it('be a sunday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Sunday');
    });
    it('be a monday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Monday');
    });
    it('be a tuesday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Tuesday');
    });
    it('be a wednesday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Wednesday');
    });
    it('be a thursday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Thursday');
    });
    it('be a friday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Friday');
    });
    it('be a saturday', function () {
      dayName = utils.getDayName(i);
      expect(dayName).toBe('Saturday');
    });
  });
  it('getMonthName must return right month name or throw errors instead', function () {
    var month,
        i = 0;
    expect(utils.getMonthName).toBeDefined();
    expect(function () {
      utils.getMonthName();
    }).toThrowError('Expect month number argument');
    expect(function () {
      utils.getMonthName('nov');
    }).toThrowError('Expect month number argument to be typeof number');
    expect(function () {
      utils.getMonthName(13);
    }).toThrowError('Month number must be in range from 0 to 11');
    month = utils.getMonthName(2);
    expect(month).toBe('march');
    spyOn(utils, 'getMonthName');
    utils.getMonthName();
    expect(utils.getMonthName).toHaveBeenCalled();
    afterEach(function () {
      i++;
    });
    it('be january', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('january');
    });
    it('be february', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('february');
    });
    it('be march', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('march');
    });
    it('be april', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('april');
    });
    it('be may', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('may');
    });
    it('be june', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('june');
    });
    it('be july', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('july');
    });
    it('be august', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('august');
    });
    it('be september', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('september');
    });
    it('be october', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('october');
    });
    it('be november', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('november');
    });
    it('be december', function () {
      month = utils.getMonthName(i);
      expect(month).toBe('december');
    });
  });
  it('convertToCelcium must perform right converting of temp or throw error', function () {
    var temp;
    temp = utils.convertToCelcium(74);
    expect(utils.convertToCelcium).toBeDefined();
    expect(temp).toBe(23);
    expect(function () {
      utils.convertToCelcium();
    }).toThrowError('No presented temperature argument');
    expect(function () {
      utils.convertToCelcium('sdfdsf');
    }).toThrowError('Type of presented temp is not a number');
  });
  it('getWthIconClassName must return right class name of the icon', function () {
    var iconName;
    iconName = utils.getWthIconClassName('clear-day');
    expect(utils.getWthIconClassName).toBeDefined();
    expect(typeof iconName).toBe('string');
    expect(iconName).toBe('sunny');
    expect(utils.getWthIconClassName('clear-night')).toBe('night');
    expect(utils.getWthIconClassName('rain')).toBe('rain');
    expect(utils.getWthIconClassName('snow')).toBe('snow');
    expect(utils.getWthIconClassName('wind')).toBe('wind');
    expect(utils.getWthIconClassName('fog')).toBe('fog');
    expect(utils.getWthIconClassName('cloudy')).toBe('cloudy-day');
    expect(utils.getWthIconClassName('partly-cloudy-day')).toBe('party-cloudy');
    expect(utils.getWthIconClassName('partly-cloudy-night')).toBe('night-less-cloudy');
  });
  it('getMoonIconClassName must return right class name of the icon', function () {
    var moonIconName;
    expect(utils.getMoonIconClassName).toBeDefined();
    moonIconName = utils.getMoonIconClassName(0.2);
    expect(moonIconName).toBeTruthy();
    expect(typeof moonIconName).toBe('string');
    expect(moonIconName).toBe('young-moon');
    moonIconName = utils.getMoonIconClassName(0.4);
    expect(moonIconName).toBe('grow-moon');
    moonIconName = utils.getMoonIconClassName(0.7);
    expect(moonIconName).toBe('almost-full');
    moonIconName = utils.getMoonIconClassName(0.9);
    expect(moonIconName).toBe('full-moon');
    moonIconName = utils.getMoonIconClassName(1.1);
    expect(moonIconName).toBe('empty-moon');
  });
  it('parseDetailedData must return object only with used props', function () {
    var parsedObject,
      testHourlyData = [
        {
          time: 1465938000,
          icon: 'rain',
          temperature:57.27
        },
        {
          time: 1465938000,
          icon: 'snow',
          temperature: 57.27
        }
      ],
      testWeekData = [
        {
          time: 1465938000,
          icon: 'rain',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'snow',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'snow',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'rain',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'snow',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'rain',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        },
        {
          time: 1465938000,
          icon: 'snow',
          temperatureMin: 57.27,
          temperatureMax: 78.1
        }
      ];
    expect(utils.parseDetailedData).toBeDefined();
    parsedObject = utils.parseDetailedData(testWeekData);
    expect(Array.isArray(parsedObject)).toBeTruthy();
    expect(parsedObject.length).toBe(7);
    expect(typeof parsedObject[0]).toBe('object');
    expect(parsedObject[0].time).toBe('-3:00');
    parsedObject = utils.parseDetailedData(testHourlyData);
    expect(Array.isArray(parsedObject)).toBeTruthy();
    expect(parsedObject.length).toBe(2);
  });
});
describe('Forecast spec', function () {
  var forecast = require('../../../src/scripts/utils/forecast');
  var cities,
    forecastTestData;
  it('getCityData must perform to call getting and rendering of city data', function (done) {
    cities = [
      {
        address: {
          cityName: 'Kharkiv',
          countryName: 'Ukraine'
        },
        lat: 48.5986674,
        lng: 37.99803670000006,
        place_id : 'ChIJp8Uk9xvm30ARwu6_7FXimKM'
      },
      {
        address: {
          cityName: 'Kharkiv',
          countryName: 'Ukraine'
        },
        lat: 48.5986674,
        lng: 37.99803670000006,
        place_id : 'ChIJp8Uk9xvm30ARwu6_7FXimKM'
      }
    ];
    forecast.getCityData(cities);
    done();
    spyOn(forecast, 'getCityData');
    forecast.getCityData(cities);
    expect(forecast.getCityData).toHaveBeenCalled();
  });
});

describe