function getPreSelectedCountry(i){var o,s=i.value,u=i.phoneNumber,C=i.defaultCountry,_=i.getAnyCountry,w=i.countries,P=i.required,B=i.metadata;return u&&u.country?o=u.country:C&&(s&&!couldNumberBelongToCountry(s,C,B)||(o=C)),w&&w.indexOf(o)<0&&(o=void 0),!o&&P&&w&&w.length>0&&(o=_()),o}