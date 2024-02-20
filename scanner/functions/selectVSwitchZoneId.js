async function selectVSwitchZoneId(fcAllowedZones, vpcZones, nasZones) {

  const allowedZones = takeIntersection(vpcZones, fcAllowedZones, nasZones);

  const sortedZones = _.sortBy(allowedZones, ['ZoneId']);

  return (_.head(sortedZones) || {}).ZoneId;
}