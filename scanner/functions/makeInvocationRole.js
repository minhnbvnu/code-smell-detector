async function makeInvocationRole(serviceName, functionName, triggerType, qualifier) {
  if (triggerType === 'Log') {

    const invocationRoleName = ram.normalizeRoleOrPoliceName(`AliyunFcGeneratedInvocationRole-${serviceName}-${functionName}`);

    const invocationRole = await ram.makeRole(invocationRoleName, true, 'Used for fc invocation', {
      'Statement': [{
        'Action': 'sts:AssumeRole',
        'Effect': 'Allow',
        'Principal': {
          'Service': [
            'log.aliyuncs.com'
          ]
        }
      }],
      'Version': '1'
    });

    const policyName = ram.normalizeRoleOrPoliceName(`AliyunFcGeneratedInvocationPolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(policyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'fc:InvokeFunction'
        ],
        'Resource': `acs:fc:*:*:services/${serviceName}/functions/*`,
        'Effect': 'Allow'
      },
      {
        'Action': [
          'log:Get*',
          'log:List*',
          'log:PostLogStoreLogs',
          'log:CreateConsumerGroup',
          'log:UpdateConsumerGroup',
          'log:DeleteConsumerGroup',
          'log:ListConsumerGroup',
          'log:ConsumerGroupUpdateCheckPoint',
          'log:ConsumerGroupHeartBeat',
          'log:GetConsumerGroupCheckPoint'
        ],
        'Resource': '*',
        'Effect': 'Allow'
      }
      ]
    });

    await ram.attachPolicyToRole(policyName, invocationRoleName, 'Custom');
    return invocationRole.Role;

  } else if (triggerType === 'RDS' || triggerType === 'MNSTopic') {

    const invocationRoleName = ram.normalizeRoleOrPoliceName(`FunCreateRole-${serviceName}-${functionName}`);
    var tMap = {
      'RDS': 'rds',
      'MNSTopic': 'mns'
    };
    var principalService = util.format('%s.aliyuncs.com', tMap[triggerType]);

    const invocationRole = await ram.makeRole(invocationRoleName, true, 'Used for fc invocation', {
      'Statement': [{
        'Action': 'sts:AssumeRole',
        'Effect': 'Allow',
        'Principal': {
          'Service': [
            principalService
          ]
        }
      }],
      'Version': '1'
    });

    const policyName = ram.normalizeRoleOrPoliceName(`FunCreatePolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(policyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'fc:InvokeFunction'
        ],
        'Resource': `acs:fc:*:*:services/${serviceName}/functions/*`,
        'Effect': 'Allow'
      }]
    });

    await ram.attachPolicyToRole(policyName, invocationRoleName, 'Custom');

    return invocationRole.Role;

  } else if (triggerType === 'TableStore') {
    const invocationRoleName = ram.normalizeRoleOrPoliceName(`FunCreateRole-${serviceName}-${functionName}`);

    const invocationRole = await ram.makeRole(invocationRoleName, true, 'Used for fc invocation', {
      'Statement': [{
        'Action': 'sts:AssumeRole',
        'Effect': 'Allow',
        'Principal': {
          'RAM': [
            'acs:ram::1604337383174619:root'
          ]
        }
      }],
      'Version': '1'
    });

    const invkPolicyName = ram.normalizeRoleOrPoliceName(`FunCreateInvkPolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(invkPolicyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'fc:InvokeFunction'
        ],
        'Resource': '*',
        'Effect': 'Allow'
      }]
    });

    await ram.attachPolicyToRole(invkPolicyName, invocationRoleName, 'Custom');

    const otsReadPolicyName = ram.normalizeRoleOrPoliceName(`FunCreateOtsReadPolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(otsReadPolicyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'ots:BatchGet*',
          'ots:Describe*',
          'ots:Get*',
          'ots:List*'
        ],
        'Resource': '*',
        'Effect': 'Allow'
      }]
    });

    await ram.attachPolicyToRole(otsReadPolicyName, invocationRoleName, 'Custom');

    return invocationRole.Role;
  } else if (triggerType === 'OSS') {

    const invocationRoleName = ram.normalizeRoleOrPoliceName(`FunCreateRole-${serviceName}-${functionName}`);

    const invocationRole = await ram.makeRole(invocationRoleName, true, 'Used for fc invocation', {
      'Statement': [
        {
          'Action': 'sts:AssumeRole',
          'Effect': 'Allow',
          'Principal': {
            'Service': [
              'oss.aliyuncs.com'
            ]
          }
        }
      ],
      'Version': '1'
    });

    const policyName = ram.normalizeRoleOrPoliceName(`FunCreateOSSPolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(policyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'fc:InvokeFunction'
        ],
        'Resource': qualifier ? `acs:fc:*:*:services/${serviceName}.*/functions/*` : `acs:fc:*:*:services/${serviceName}/functions/*`,
        'Effect': 'Allow'
      }]
    });

    await ram.attachPolicyToRole(policyName, invocationRoleName, 'Custom');
    return invocationRole.Role;

  } else if (triggerType === 'CDN') {

    const invocationRoleName = ram.normalizeRoleOrPoliceName(`FunCreateRole-${serviceName}-${functionName}`);

    const invocationRole = await ram.makeRole(invocationRoleName, true, 'Used for fc invocation', {
      'Statement': [
        {
          'Action': 'sts:AssumeRole',
          'Effect': 'Allow',
          'Principal': {
            'Service': [
              'cdn.aliyuncs.com'
            ]
          }
        }
      ],
      'Version': '1'
    });

    const policyName = ram.normalizeRoleOrPoliceName(`FunCreateCDNPolicy-${serviceName}-${functionName}`);

    await ram.makePolicy(policyName, {
      'Version': '1',
      'Statement': [{
        'Action': [
          'fc:InvokeFunction'
        ],
        'Resource': `acs:fc:*:*:services/${serviceName}/functions/*`,
        'Effect': 'Allow'
      }]
    });

    await ram.attachPolicyToRole(policyName, invocationRoleName, 'Custom');
    return invocationRole.Role;
  }
  return;
}