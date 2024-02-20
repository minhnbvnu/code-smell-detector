function getDataByState(confirmed, deaths) {
  const countryMap = {};
  const lastUpdated = confirmed.last_updated;
  const confirmedMap = _.keyBy(confirmed.locations, (i) => i.country + i.province);
  const deathsMap = _.keyBy(deaths.locations, (i) => i.country + i.province);
  confirmed.locations.forEach(obj => {
    const countryName = obj.country;
    const provinceName = obj.province;
    const mapKey = countryName + provinceName;
    if (!countryMap[mapKey] && confirmedMap[mapKey].latest > 0) {
      countryMap[mapKey] = {
        country: countryName,
        province: provinceName,
        countryCode: obj.country_code,
        confirmed: confirmedMap[mapKey].latest,
        deaths: deathsMap[mapKey].latest,
        confirmedByDay: helpers.historyObjToArr(confirmedMap[mapKey].history),
        deathsByDay: helpers.historyObjToArr(deathsMap[mapKey].history),
        lastUpdated,
      };
    }
  });
  const countryArr = extraStats(
    Object.keys(countryMap).map(key => countryMap[key])
  );
  return _.sortBy(countryArr, (o) => -o.confirmed);
}