async function getChangeSet(rosClient, changeSetId, region) {

  let res;
  let changes;
  do {
    const params = {
      'RegionId': region,
      'ChangeSetId': changeSetId,
      'ShowTemplate': true
    };

    await time.sleep(500);

    res = await rosClient.request('GetChangeSet', params, requestOption);

    changes = res.Changes;
  } while (!changes);

  return {
    changes,
    parameters: res.Parameters,
    status: res.Status,
    executionStatus: res.ExecutionStatus
  };
}