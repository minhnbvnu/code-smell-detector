async function authDefaultSecurityGroupRules(ecsClient, region, securityGroupId) {

  const sgRules = [
    { protocol: 'TCP', port: '80/80' },
    { protocol: 'TCP', port: '443/443' },
    { protocol: 'ICMP', port: '-1/-1' },
    { protocol: 'TCP', port: '22/22' }
  ];

  for (const rule of sgRules) {
    await authSecurityGroupRule(ecsClient, region, securityGroupId, rule.protocol, rule.port);
  }
}