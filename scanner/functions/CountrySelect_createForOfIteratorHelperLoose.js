function CountrySelect_createForOfIteratorHelperLoose(i,o){var s="undefined"!=typeof Symbol&&i[Symbol.iterator]||i["@@iterator"];if(s)return(s=s.call(i)).next.bind(s);if(Array.isArray(i)||(s=CountrySelect_unsupportedIterableToArray(i))||o&&i&&"number"==typeof i.length){s&&(i=s);var u=0;return function(){return u>=i.length?{done:!0}:{done:!1,value:i[u++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}