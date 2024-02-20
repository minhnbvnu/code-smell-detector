function printPermissionTip(policyName, action, resource) {
  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          action
        ],
        'Resource': [
          resource
        ]
      }
    ]
  };
  console.error(red(`\nYou can run the following commands to grant permission '${action}' on '${resource}' `));
  console.error(red('Via the link:  https://shell.aliyun.com/ or aliyun cli'));
  console.error(red('(Note: aliyun cli tool needs to be configured with credentials that have related RAM permissions, such as primary account\'s AK)'));
  console.error(red('\n1. Create Policy'));
  console.error(red(`aliyun ram CreatePolicy --PolicyName ${policyName} --PolicyDocument "${JSON.stringify(policy).replace(/"/g, '\\"')}"`));
  console.error(red('\n2. Attach Policy To User'));
  console.error(red(`aliyun ram AttachPolicyToUser --PolicyName ${policyName} --PolicyType "Custom" --UserName "YOUR_USER_NAME"\n`));
}