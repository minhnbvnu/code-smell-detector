function takeIntersection(vpcZones, fcAllowedZones, nasZones) {

  const threeIntersection = _.filter(vpcZones, z => {
    return _.includes(fcAllowedZones, z.ZoneId) && _.includes(nasZones.map(zone => { return zone.ZoneId; }), z.ZoneId);
  });

  if (!_.isEmpty(threeIntersection)) {
    return threeIntersection;
  }

  return _.filter(vpcZones, z => {
    return _.includes(fcAllowedZones, z.ZoneId);
  });
}