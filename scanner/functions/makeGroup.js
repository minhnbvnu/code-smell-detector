async function makeGroup(group) {
  const ag = await getCloudApiClient();

  const groupName = group.name;
  const groupDescription = group.description;

  var findGroup;

  await promiseRetry(async (retry, times) => {
    try {
      var groups = await ag.describeApiGroups({
        GroupName: groupName
      });

      debug(`describeApiGroups response ${JSON.stringify(groups)}`);

      var list = groups.ApiGroupAttributes.ApiGroupAttribute;
      findGroup = list.find((item) => {
        return item.GroupName === groupName;
      });

      if (!findGroup) {
        findGroup = await ag.createApiGroup({
          GroupName: groupName,
          Description: groupDescription
        });
      }

    } catch (ex) {
      debug('error when makeGroup, error is: \n%O', ex);

      console.log(red(`\tretry ${times} times`));
      retry(ex);
    }
  });

  return findGroup;
}