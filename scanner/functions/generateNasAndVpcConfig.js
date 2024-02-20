function generateNasAndVpcConfig(mountTarget, securityGroupId, serviceName) {
  const nasConfig = {
    'UserId': 10003,
    'GroupId': 10003,
    'MountPoints': [
      {
        'ServerAddr': `${mountTarget.MountTargetDomain}:/${serviceName}`,
        'MountDir': '/mnt/nas'
      }
    ]
  };

  const vpcConfig = {
    'VpcId': mountTarget.VpcId,
    'VSwitchIds': [mountTarget.VswId],
    'SecurityGroupId': securityGroupId
  };

  return {
    'VpcConfig': vpcConfig,
    'NasConfig': nasConfig
  };
}