function parsePhoneNumberFromString(i,o,s){o&&o.defaultCountry&&!isSupportedCountry(o.defaultCountry,s)&&(o=parsePhoneNumberFromString_objectSpread(parsePhoneNumberFromString_objectSpread({},o),{},{defaultCountry:void 0}));try{return parsePhoneNumber_parsePhoneNumber(i,o,s)}catch(i){if(!(i instanceof za))throw i}}