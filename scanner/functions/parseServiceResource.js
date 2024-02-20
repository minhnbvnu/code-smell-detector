function parseServiceResource(serviceMeta) {
  const serviceResource = {
    Type: SERVICE_TYPE,
    Properties: {}
  };
  const properties = serviceResource.Properties;
  doProp(properties, 'Description', serviceMeta.description);
  doProp(properties, 'Role', serviceMeta.role);
  const logConfig = serviceMeta.logConfig;
  if (isLogConfigNotEmpty(logConfig)) {
    doProp(properties, 'LogConfig', {
      Project: logConfig.project,
      Logstore: logConfig.logstore
    });
  }

  const vpcConfig = serviceMeta.vpcConfig;
  if (isVpcConfigNotEmpty(vpcConfig)) {
    doProp(properties, 'VpcConfig', {
      VpcId: vpcConfig.vpcId,
      VSwitchIds: vpcConfig.vSwitchIds,
      SecurityGroupId: vpcConfig.securityGroupId
    });
  }

  const nasConfig = serviceMeta.nasConfig;
  if (isNasConfigNotEmpty(nasConfig)) {
    doProp(properties, 'NasConfig', {
      UserId: nasConfig.userId,
      GroupId: nasConfig.groupId,
      MountPoints: nasConfig.mountPoints.map(p => ({ ServerAddr: p.serverAddr, MountDir: p.mountDir }))
    });
  }
  properties.InternetAccess = serviceMeta.internetAccess;

  return serviceResource;
}