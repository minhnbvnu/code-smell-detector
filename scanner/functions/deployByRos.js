async function deployByRos(baseDir, stackName, tpl, assumeYes, parameterOverride = {}, tplPath) {
  const profile = await getProfile();
  const region = profile.defaultRegion;
  const { accountId } = profile;

  transformAsyncConfiguration(tpl.Resources, region, accountId);
  if (!tpl.Transform) {
    await transformRosYmlCodeUri({ baseDir, tpl, tplPath });
    outputTemplateFile(path.join(process.cwd(), 'template.packaged.yml'), tpl);
  }
  const rosClient = await client.getRosClient();

  let { stackId, stackStatus } = await findRosStack(rosClient, region, stackName);

  let changeSetId;
  let createStack = false;
  if (!stackId) { // create
    const changeSet = await createChangeSet(rosClient, region, stackName, tpl, parseRosParameters(tpl.Parameters, parameterOverride));

    changeSetId = changeSet.changeSetId;
    stackId = changeSet.stackId;
    createStack = true;
  } else { // update

    if (_.includes(DELETE_LAST_DEPLOYMENT_FAILED_STATUS, stackStatus)) {
      if (!assumeYes) {
        if (await promptForConfirmContinue(`The status of last deployed stack is ${stackStatus}, fun want to delete it and redeploy it.`)) {
          await deleteStack(rosClient, stackId, region);
          await waitStackDeleted(rosClient, stackId, region, stackName);
          await deployByRos(baseDir, stackName, tpl, assumeYes, parameterOverride);
          return;
        }
      }
    }

    changeSetId = await updateChangeSet(
      rosClient, region, stackName, stackId, tpl, parseRosParameters(tpl.Parameters, parameterOverride));
  }

  const { changes, parameters, status, executionStatus } = await getChangeSet(rosClient, changeSetId, region);

  displayChanges(changes);
  displayParameters(parameters);

  const canDelete = _.includes(ROS_STATUS_FOR_DELETE_CHANGESET, status) && _.includes(ROS_EXECUTE_STATUS_FOR_DELETE_CHANGESET, executionStatus);

  if (!assumeYes) {
    if (!await promptForConfirmContinue('Please confirm to continue.')) {
      if (canDelete) { await deleteChangeSet(rosClient, changeSetId, region); }
      // 当删除类型为 CREATE 的更改集时，需要自行删除其关联的资源栈。
      if (status === 'CREATE_COMPLETE' && createStack) { await deleteStack(rosClient, stackId, region); }
      return;
    }
  }

  await promiseRetry(async (retry, times) => {
    try {
      await execChangeSet(rosClient, region, changeSetId);
    } catch (e) {
      if (e.code === 'NotSupported' && e.data && e.data.Message
        && e.data.Message.indexOf('StatusEnum.CREATE_IN_PROGRESS is not supported')) {
        await time.sleep(1000);
        console.log('changeSet is in \'StatusEnum.CREATE_IN_PROGRESS\' status, try to exectue again');
        retry(e);
      } else {
        throw e;
      }
    }
  });
  console.log('ROS Stack Events:\n');

  let isComplete = false;
  do {
    const { completed, events} = await getStackEvents(rosClient, stackId, region, stackName);
    displayEventsStatus(events, stackName);

    isComplete = completed;
  } while (!isComplete);

  const rosTemplateData = await getTemplate(rosClient, stackId, region);
  const rosTemplateObj = await saveTemplate(baseDir, rosTemplateData);

  await detectRosHttpTrigger(rosTemplateObj.Resources);

  const res = await getStack(rosClient, stackId, region);
  displayOutputs(res.Outputs);

  showRosDeployNextTips(region);
}