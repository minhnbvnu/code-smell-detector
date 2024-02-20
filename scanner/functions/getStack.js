async function getStack(rosClient, stackId, region) {
  const params = {
    'RegionId': region,
    'StackId': stackId
  };

  return await rosClient.request('GetStack', params, requestOption);
}