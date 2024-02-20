async function createDefaultVSwitchIfNotExist(vpcClient, region, vpcId, vswitchIds) {
  let vswitchId = await vswitch.findVswitchExistByName(vpcClient, region, vswitchIds, defaultVSwitchName);

  if (!vswitchId) { // create vswitch
    console.log('\t\tcould not find default vswitch, ready to generate one');
    vswitchId = await vswitch.createDefaultVSwitch(vpcClient, region, vpcId, defaultVSwitchName);
    console.log(green('\t\tdefault vswitch has been generated, vswitchId is: ' + vswitchId));
  } else {
    console.log(green('\t\tvswitch already generated, vswitchId is: ' + vswitchId));
  }
  return vswitchId;
}