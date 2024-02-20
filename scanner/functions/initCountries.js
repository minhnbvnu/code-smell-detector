function initCountries(countries, enableAreaCodes, prefix, defaultMask, alwaysDefaultMask) {
  let hiddenAreaCodes = [];

  let enableAllCodes;
  if (enableAreaCodes === true) { enableAllCodes = true }
  else { enableAllCodes = false }

  const initializedCountries = [].concat(...countries.map((country) => {
    const countryItem = {
      name: country[0],
      regions: country[1],
      iso2: country[2],
      countryCode: country[3],
      dialCode: country[3],
      format: getMask(prefix, country[3], country[4], defaultMask, alwaysDefaultMask),
      priority: country[5] || 0,
    };

    const areaItems = [];

    country[6] &&
      country[6].map((areaCode) => {
        const areaItem = {...countryItem};
        areaItem.dialCode = country[3] + areaCode;
        areaItem.isAreaCode = true;
        areaItem.areaCodeLength = areaCode.length;

        areaItems.push(areaItem);
      });

    if (areaItems.length > 0) {
      countryItem.mainCode = true;
      if (enableAllCodes || (enableAreaCodes.constructor.name === 'Array' && enableAreaCodes.includes(country[2]))) {
        countryItem.hasAreaCodes = true;
        return [countryItem, ...areaItems];
      } else {
        hiddenAreaCodes = hiddenAreaCodes.concat(areaItems);
        return [countryItem];
      }
    } else {
      return [countryItem];
    }
  }));

  return [initializedCountries, hiddenAreaCodes]
}