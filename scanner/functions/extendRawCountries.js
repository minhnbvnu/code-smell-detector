function extendRawCountries(countries, userContent) {
  if (userContent.length === 0) return countries;

  // userContent index -> rawCountries index of country array to extend
  // [iso2 (0 -> 2), mask (1 -> 4), priority (3 -> 5), areaCodes (2 -> 6)]

  return countries.map(o => {
    const userContentIndex = userContent.findIndex(arr => arr[0] === o[2]); // find by iso2
    if (userContentIndex === -1) return o; // if iso2 not in userContent, return source country object
    const userContentCountry = userContent[userContentIndex];
    if (userContentCountry[1]) o[4] = userContentCountry[1]; // mask
    if (userContentCountry[3]) o[5] = userContentCountry[3]; // priority
    if (userContentCountry[2]) o[6] = userContentCountry[2]; // areaCodes
    return o;
  })
}