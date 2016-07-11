describe('custom test', function () {
    var utils;
    beforeEach(function(){
        utils = require('../../../src/scripts/utils/utils');
    });
    it('getFromStorage must', function () {
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

});