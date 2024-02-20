async function execChangeSet(rosClient, region, changeSetId) {
  const params = {
    'RegionId': region,
    'ChangeSetId': changeSetId
  };

  await rosClient.request('ExecuteChangeSet', params, requestOption);
}