function stripCountryCallingCode(i,o,s){if(o){var u="+"+getCountryCallingCode(o,s);if(i.length<u.length){if(0===u.indexOf(i))return""}else if(0===i.indexOf(u))return i.slice(u.length)}for(var C=0,_=Object.keys(s.country_calling_codes);C<_.length;C++){var w=_[C];if(i.indexOf(w)==="+".length)return i.slice("+".length+w.length)}return""}