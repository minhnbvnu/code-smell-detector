async function getAvailableVSwitchId(vpcClient, region, vswitchIds, nasZones) {

  const fcZones = await convertToFcAllowedZones(vpcClient, region, vswitchIds);

  const availableZones = fcZones.filter(fcZone => { return _.includes(nasZones.map(m => { return m.ZoneId; }), fcZone.zoneId); });

  const performances = [];
  const capacities = [];

  _.forEach(nasZones, nasZone => {
    if (_.includes(availableZones.map(z => z.zoneId), nasZone.ZoneId)) {
      if (!_.isEmpty(nasZone.Performance.Protocol)) { performances.push(nasZone); }
      if (!_.isEmpty(nasZone.Capacity.Protocol)) { capacities.push(nasZone); }
    }
  });

  if (!_.isEmpty(performances)) {
    return convertZones(_.head(performances), availableZones);
  }

  if (!_.isEmpty(capacities)) {
    const msg = `Region ${region} only supports capacity NAS. Do you want to create it automatically?`;
    const yes = await promptForConfirmContinue(msg);
    if (yes) { return convertZones(_.head(capacities), availableZones, 'Capacity'); }
    throw new Error(`No NAS service available under region ${region}.`);
  }

  return processDifferentZones(nasZones, _.head(fcZones).vswitchId);
}