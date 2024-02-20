async function throwProcessedSLSPermissionError(ex) {
  if (!ex.code || ex.code !== 'Unauthorized' || !ex.message) {
    throw ex;
  }
  const regex = new RegExp(/action: (.*), resource: (.*)/);
  const res = regex.exec(ex.message);
  if (!res) {
    throw ex;
  }
  const action = res[1];
  const resource = res[2];
  const policyName = generatePolicyName(action);
  printPermissionTip(policyName, action, resource);
  throw ex;
}