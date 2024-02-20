async function throwProcessedFCPermissionError(ex, ...resourceArr) {
  if (!ex.code || ex.code !== 'AccessDenied' || !ex.message) {
    throw ex;
  }
  const regex = new RegExp(/the caller is not authorized to perform '(.*)' on resource '(.*)'/);
  const res = regex.exec(ex.message);
  if (!res) {
    throw ex;
  }
  const profile = await getProfile();
  const action = res[1];
  const resource = res[2];
  const policyName = generatePolicyName(action, profile.defaultRegion, ...resourceArr);
  printPermissionTip(policyName, action, resource);
  throw ex;
}