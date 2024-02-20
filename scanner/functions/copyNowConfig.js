async function copyNowConfig() {
  await copy('./now.json', getBuildPath('now.json'));
}