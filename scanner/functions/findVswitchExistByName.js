async function findVswitchExistByName(vpcClient, region, vswitchIds, searchVSwtichName) {

  if (!_.isEmpty(vswitchIds)) {
    for (let vswitchId of vswitchIds) {

      const vswitchName = await getVSwitchName(vpcClient, region, vswitchId);

      if (_.isEqual(searchVSwtichName, vswitchName)) {
        debug('found default vswitchId: ' + vswitchId);

        return vswitchId;
      }
    }
  }

  debug('could not find %s from %j for region %s', searchVSwtichName, vswitchIds, region);

  return null;
}