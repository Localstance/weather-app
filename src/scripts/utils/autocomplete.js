var citiesList = require('../views/citiesListView');
var autocomplete = (function () {
  var autocompleteField = $('.autocomplete');
  var autocompleteInput = $(autocompleteField).find('input');
  var noResult = $('.no-result-msg');
  var placesList = $('.places-list').find('ul');
  var queryText;

  /*Autocomplete*/
  $(autocompleteInput).on('input', function () {
    //e.preventDefault();
    var typedText = $(this).val();
    var textLength = typedText.length;
    /* if no results*/
    if (textLength !== 0) {
      $(noResult).addClass('hooded');
      queryText = typedText;
    } else {
      $(noResult).removeClass('hooded');
    }
    //getCitiesFromVendor();
  }).on('keyup', function () {
    var typedText = $(this).val();
    var textLength = typedText.length;
    if (textLength < 1) {
      $(placesList).find('.temp-prediction').remove();
      $(noResult).removeClass('hooded');
    }
  });

  function initAutocomplete() {
    var autocomplete = new google.maps.places.AutocompleteService(); // eslint-disable-line
    var geocoder = new google.maps.Geocoder(); // eslint-disable-line

    function callPredictions(predictions) {
      var termsLastItem;
      var placesCollection = [];
      predictions.forEach(function (prediction) {
        var place = {};
        termsLastItem = prediction.terms.length - 1;
        place.place_id = prediction.place_id;
        place.desc = prediction.description;
        place.address = {};
        place.address.cityName = prediction.terms[0].value;
        place.address.countryName = prediction.terms[termsLastItem].value;
        geocoder.geocode({
          placeId: place.place_id
        }, function (response, status) {
          /* callGeocodeData(response,status,place);*/
          if (status === google.maps.GeocoderStatus.OK) { // eslint-disable-line
            place.lat = response[0].geometry.location.lat();
            place.lng = response[0].geometry.location.lng();
          }
        });

        placesCollection.push(place);
      });

      citiesList.renderAutocompleteList(placesCollection);
    }

    $(autocompleteInput).on('input', function () {
      //e.preventDefault();
      autocomplete.getPlacePredictions({
        input: queryText,
        types: ['(cities)']
      }, callPredictions);
    });
  }

  return {
    initAutocomplete: initAutocomplete
  };
})();

module.exports = autocomplete;
