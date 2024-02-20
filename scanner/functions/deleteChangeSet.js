async function deleteChangeSet(rosClient, changeSetId, region) {
  const params = {
    'RegionId': region,
    'ChangeSetId': changeSetId
  };
  await rosClient.request('DeleteChangeSet', params, requestOption);
}