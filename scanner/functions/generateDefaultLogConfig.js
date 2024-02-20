async function generateDefaultLogConfig() {
  const profile = await getProfile();
  return {
    project: generateSlsProjectName(profile.accountId, profile.defaultRegion),
    logstore: `function-log`,
    enableRequestMetrics: true,
    enableInstanceMetrics: true
  };
}