async function findRosStack(rosClient, region, stackName) {
  const pageSize = 50;
  let requestPageNumber = 0;
  let totalCount;
  let pageNumber;

  let stack;

  do {
    const params = {
      'RegionId': region,
      'StackName.1': stackName,
      'PageSize': pageSize,
      'PageNumber': ++requestPageNumber,
      'ShowNestedStack': false
    };

    const rs = await rosClient.request('ListStacks', params, requestOption);

    totalCount = rs.TotalCount;
    pageNumber = rs.PageNumber;

    const stacks = rs.Stacks;

    stack = _.find(stacks, { StackName: stackName });
  } while (!stack && totalCount && pageNumber && pageNumber * pageSize < totalCount);

  const curStack = (stack || {});
  return {
    stackId: curStack.StackId,
    stackStatus: curStack.Status
  };
}