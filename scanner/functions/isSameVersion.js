async function isSameVersion(serviceName, version) {
  const nasHttpTriggerPath = getNasHttpTriggerPath(serviceName);
  let getVersionRes;
  let curNasServerVersion;
  try {
    getVersionRes = await getVersion(nasHttpTriggerPath);
    curNasServerVersion = (getVersionRes.data).curVersionId;
  } catch (error) {
    curNasServerVersion = -1;
  }

  return _.isEqual(curNasServerVersion, version);
}