async function generateServiceRole({ serviceName, vpcConfig, nasConfig,
  logConfig, roleArn, policies, hasFunctionAsyncConfig,
  hasCustomContainerConfig
}) {

  const profile = await getProfile();
  const defaultRegion = profile.defaultRegion;

  let role;
  let roleName;
  let createRoleIfNotExist = false;

  if (_.isNil(roleArn)) {
    roleName = `aliyunfcgeneratedrole-${defaultRegion}-${generateRoleNameSuffix(serviceName)}`;
    roleName = normalizeRoleOrPoliceName(roleName);
    createRoleIfNotExist = true;
  } else {
    try {
      roleName = extractFcRole(roleArn);
    } catch (ex) {
      throw new Error('The role you provided is not correct. You must provide the correct role arn.');
    }
  }
  // if roleArn has been configured, dont need `makeRole`, because `makeRole` need ram permissions.
  // However, in some cases, users do not want to configure ram permissions for ram users.
  // https://github.com/aliyun/fun/issues/182
  // https://github.com/aliyun/fun/pull/223
  if (!roleArn && (policies || !_.isEmpty(vpcConfig) || !_.isEmpty(logConfig) || !_.isEmpty(nasConfig) || hasFunctionAsyncConfig || hasCustomContainerConfig)) {
    // create role
    console.log(`\tmake sure role '${roleName}' is exist`);
    role = await makeRole(roleName, createRoleIfNotExist);
    console.log(green(`\trole '${roleName}' is already exist`));
  }

  if (!roleArn && policies) { // if roleArn exist, then ignore polices
    console.log('\tattaching policies ' + JSON.stringify(policies) + ' to role: ' + roleName);
    await deployPolicies(serviceName, roleName, policies);
    console.log(green('\tattached policies ' + JSON.stringify(policies) + ' to role: ' + roleName));
  }

  if (!roleArn && hasFunctionAsyncConfig) {
    console.log('\tattaching police \'AliyunFCInvocationAccess\' to role: ' + roleName);
    await attachPolicyToRole('AliyunFCInvocationAccess', roleName);
    console.log(green('\tattached police \'AliyunFCInvocationAccess\' to role: ' + roleName));

    const mnsPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedMNSPolicy-${defaultRegion}-${serviceName}`);
    await makeAndAttachPolicy(mnsPolicyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'mns:SendMessage',
          'mns:PublishMessage'
        ],
        'Resource': '*',
        'Effect': 'Allow'
      }]
    }, roleName);
  }

  if (!roleArn && (!_.isEmpty(vpcConfig) || !_.isEmpty(nasConfig))) {
    console.log('\tattaching police \'AliyunECSNetworkInterfaceManagementAccess\' to role: ' + roleName);
    await attachPolicyToRole('AliyunECSNetworkInterfaceManagementAccess', roleName);
    console.log(green('\tattached police \'AliyunECSNetworkInterfaceManagementAccess\' to role: ' + roleName));
  }

  if (!roleArn && hasCustomContainerConfig) {
    console.log('\tattaching police \'AliyunContainerRegistryReadOnlyAccess\' to role: ' + roleName);
    await attachPolicyToRole('AliyunContainerRegistryReadOnlyAccess', roleName);
    console.log(green('\tattached police \'AliyunContainerRegistryReadOnlyAccess\' to role: ' + roleName));
  }

  if (logConfig.Logstore && logConfig.Project) {
    if (!roleArn) {
      const logPolicyName = normalizeRoleOrPoliceName(`AliyunFcGeneratedLogPolicy-${defaultRegion}-${serviceName}`);
      await makeAndAttachPolicy(logPolicyName, {
        'Version': '1',
        'Statement': [{
          'Action': [
            'log:PostLogStoreLogs'
          ],
          'Resource': `acs:log:*:*:project/${logConfig.Project}/logstore/${logConfig.Logstore}`,
          'Effect': 'Allow'
        }]
      }, roleName);
    }
  } else if (logConfig.LogStore || logConfig.Project) {
    throw new Error('LogStore and Project must both exist');
  } else if (definition.isLogConfigAuto(logConfig)) {
    if (!roleArn) {
      console.log('\tattaching police \'AliyunLogFullAccess\' to role: ' + roleName);
      await attachPolicyToRole('AliyunLogFullAccess', roleName);
      console.log(green('\tattached police \'AliyunLogFullAccess\' to role: ' + roleName));
    }
  }

  return ((role || {}).Role || {}).Arn || roleArn || '';
}