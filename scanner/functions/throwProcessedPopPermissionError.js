async function throwProcessedPopPermissionError(ex, action) {
  if (!ex.code || !ex.url || (ex.code !== 'NoPermission' && ex.code !== 'Forbidden.RAM' && !ex.code.includes('Forbbiden'))) { // NAS 返回的权限错误码是 Forbbiden.ram
    throw ex;
  }
  const productRegex = new RegExp(/https?:\/\/([a-zA-Z]*).(.*)aliyuncs.com/);
  const productRegexRes = productRegex.exec(ex.url);
  if (!productRegexRes) {
    throw ex;
  }
  const product = productRegexRes[1];
  action = `${product}:${action}`;
  let resource = '*';
  if (ex.data && ex.data.Message) {
    const regex = new RegExp(/Resource: (.*) Action: (.*)/);
    const res = regex.exec(ex.data.Message);
    if (res) {
      resource = res[1];
      action = res[2];
    }
  }
  const policyName = generatePolicyName(action);
  printPermissionTip(policyName, action, resource);
  throw ex;
}