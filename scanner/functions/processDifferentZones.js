function processDifferentZones(nasZones, FcAllowVswitchId) {

  const performance = _.find(nasZones, nasZone => !_.isEmpty(nasZone.Performance.Protocol));

  if (!_.isEmpty(performance)) {

    return {
      zoneId: performance.ZoneId,
      vswitchId: FcAllowVswitchId,
      storageType: 'Performance'
    };
  }

  const capacity = _.find(nasZones, nasZone => !_.isEmpty(nasZone.Capacity.Protocol));

  if (!_.isEmpty(capacity)) {
    return {
      zoneId: capacity.ZoneId,
      vswitchId: FcAllowVswitchId,
      storageType: 'Capacity'
    };
  }

  return null;
}