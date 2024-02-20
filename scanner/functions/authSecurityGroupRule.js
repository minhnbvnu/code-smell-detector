async function authSecurityGroupRule(ecsClient, region, securityGroupId, protocol, port) {
  var params = {
    'RegionId': region,
    'SecurityGroupId': securityGroupId,
    'IpProtocol': protocol,
    'PortRange': port,
    'Policy': 'Accept',
    'SourceCidrIp': '0.0.0.0/0',
    'NicType': 'intranet'
  };

  const rs = await ecsClient.request('AuthorizeSecurityGroup', params, requestOption);
  return rs;
}