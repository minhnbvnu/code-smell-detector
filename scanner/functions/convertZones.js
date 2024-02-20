function convertZones(nasZones, zones, storageType = 'Performance') {
  const zoneId = nasZones.ZoneId;
  const vswitchId = zones.filter(f => { return f.zoneId === zoneId; });
  return {
    zoneId,
    vswitchId: _.head(vswitchId).vswitchId,
    storageType
  };
}