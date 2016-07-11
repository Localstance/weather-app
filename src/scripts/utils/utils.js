var utils = (function () {
  function getFromStorage(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  }

  function saveToStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function deleteFromStorage(key, index) {
    var collection = getFromStorage(key);
    collection.splice(index, 1);
    return collection;
  }

  function clearStorage() {
    window.localStorage.clear();
  }

  function getCompiledTime(timestamp, timezone) {
    var time;
    var hours;
    var minutes;
    if (!timestamp) {
      throw new Error('Expect timestamp argument');
    }
    if (typeof timestamp !== 'number') {
      throw new Error('Timestamp must be a number');
    }

    time = new Date(timestamp * 1000);
    hours = (time.getHours() - 3 + (timezone || 0)).toString();
    if (parseInt(hours, 10) > 23) {
      hours = (parseInt(hours, 10) - 24).toString();
    }
    minutes = (time.getMinutes()).toString();

    if (hours.length === 1) {
      hours = '0' + hours;
    }
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    time = hours + ':' + minutes;

    return time;
  }

  function getDayName(num) {
    var dayNames;
    if (!num && num !== 0) {
      throw new Error('Expect day number argument');
    } else if (typeof num !== 'number') {
      throw new Error('Expect day number argument typeof number');
    } else if (num > 6) {
      throw new Error('Week number must be in range from 0 to 6');
    }

    dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[num];
  }

  function getMonthName(num) {
    var monthNames;
    if (!num) {
      throw new Error('Expect month number argument');
    } else if (typeof num !== 'number') {
      throw new Error('Expect month number argument to be typeof number');
    } else if (num > 11) {
      throw new Error('Month number must be in range from 0 to 11');
    }
    monthNames = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ];
    return monthNames[num];
  }

  function convertToCelcium(temp) {
    if (!temp) {
      throw new Error('No presented temperature argument');
    } else if (typeof temp !== 'number') {
      throw new Error('Type of presented temp is not a number');
    }
    return Math.round((temp - 32) / 1.8);
  }

  function parseDetailedData(collection, timezone) {
    var colLength = collection.length;
    var i;
    var tempObj;
    var parsedCol = [];
    var currentTime;
    for (i = 0; i < colLength; i++) {
      tempObj = {};
      currentTime = new Date(collection[i].time * 1000);
      tempObj.time = getCompiledTime(collection[i].time, timezone);
      tempObj.icon = getWthIconClassName(collection[i].icon);
      if (collection[i].temperature) {
        tempObj.tempF = parseInt(collection[i].temperature, 10);
        tempObj.tempC = convertToCelcium(collection[i].temperature);
      } else if (collection[i].temperatureMax && collection[i].temperatureMin) {
        tempObj.tempMaxF = parseInt(collection[i].temperatureMax, 10);
        tempObj.tempMinF = parseInt(collection[i].temperatureMin, 10);
        tempObj.tempMaxC = convertToCelcium(collection[i].temperatureMax);
        tempObj.tempMinC = convertToCelcium(collection[i].temperatureMin);
        tempObj.dayName = getDayName(currentTime.getDay()).slice(0, 3);
        if (i === 0) {
          tempObj.dayName = 'TODAY';
        }
      }
      parsedCol.push(tempObj);
    }
    return parsedCol;
  }

  function getWthIconClassName(icon) {
    var iconSet = {
      'clear-day': 'sunny',
      'clear-night': 'night',
      rain: 'rain',
      snow: 'snow',
      wind: 'wind',
      fog: 'fog',
      cloudy: 'cloudy-day',
      'partly-cloudy-day': 'party-cloudy',
      'partly-cloudy-night': 'night-less-cloudy'
    };
    return iconSet[icon];
  }

  function getMoonIconClassName(moonPhase) {
    if (moonPhase < 0.25) {
      return 'young-moon';
    } else if (moonPhase < 0.5) {
      return 'grow-moon';
    } else if (moonPhase < 0.75) {
      return 'almost-full';
    } else if (moonPhase <= 1) {
      return 'full-moon';
    } else {
      return 'empty-moon';
    }
  }

  return {
    getFromStorage: getFromStorage,
    saveToStorage: saveToStorage,
    deleteFromStorage: deleteFromStorage,
    clearStorage: clearStorage,
    getCompiledTime: getCompiledTime,
    getDayName: getDayName,
    getMonthName: getMonthName,
    convertToCelcium: convertToCelcium,
    parseDetailedData: parseDetailedData,
    getWthIconClassName: getWthIconClassName,
    getMoonIconClassName: getMoonIconClassName
  };
})();

module.exports = utils;
