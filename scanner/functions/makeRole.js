async function makeRole(roleName, createRoleIfNotExist, description = 'FunctionCompute Default Role', assumeRolePolicy) {
  
  const ram = await getRamClient();
  var role;
  await promiseRetry(async (retry, times) => {
    try {      
      role = await getRamRole(ram, roleName);
  
      if (!assumeRolePolicy) {
        assumeRolePolicy = {
          'Statement': [
            {
              'Action': 'sts:AssumeRole',
              'Effect': 'Allow',
              'Principal': {
                'Service': [
                  'fc.aliyuncs.com'
                ]
              }
            }
          ],
          'Version': '1'
        };
      }

      if (!role && createRoleIfNotExist) {
        role = await ram.createRole({
          RoleName: roleName,
          Description: description,
          AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicy)
        });
      } else if (!role) {
        throw new Error(`role ${roleName} not exist`);
      }
    } catch (ex) {
      debug('error when makeRole: %s, error is: \n%O', roleName, ex);

      if (ex.code && ex.code.startsWith('InvalidParameter')) {
        throw ex;
      } else if (ex.code && ex.code === 'NoPermission') {
        throw ex;
      } else {
        console.log(red(`retry ${times} times`));
        retry(ex);
      }
    }
  });

  return role;
}