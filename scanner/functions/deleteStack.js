async function deleteStack(rosClient, stackId, region) {
  const params = {
    'RegionId': region,
    'StackId': stackId
  };

  debug('delete stack, params %s', params);
  await rosClient.request('DeleteStack', params, requestOption);
}