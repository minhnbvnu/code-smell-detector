function generateSlsProjectName(accountId, region) {
  const uuidHash = getUuid(accountId);
  return `aliyun-fc-${region}-${uuidHash}`;
}