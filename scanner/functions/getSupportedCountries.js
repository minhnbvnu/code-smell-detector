function getSupportedCountries(i,o){return i&&0===(i=i.filter((function(i){return isCountrySupportedWithError(i,o)}))).length&&(i=void 0),i}