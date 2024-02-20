async function makeTrigger({
  serviceName,
  functionName,
  triggerName,
  triggerType,
  triggerProperties
}) {
  const fc = await getFcClient();
  var trigger;
  try {
    trigger = await fc.getTrigger(serviceName, functionName, triggerName);
  } catch (ex) {
    if (ex.code !== 'TriggerNotFound') {
      throw ex;
    }
  }

  const params = {
    triggerType: triggerTypeMapping[triggerType],
    triggerConfig: getTriggerConfig(triggerType, triggerProperties)
  };

  debug('serviceName is %s, functionName is %s, trigger params is %j', serviceName, functionName, params);

  let invocationRoleArn = triggerProperties.InvocationRole;

  if (!invocationRoleArn) {
    const invocationRole = await makeInvocationRole(serviceName, functionName, triggerType, triggerProperties.Qualifier);

    if (invocationRole) {
      invocationRoleArn = invocationRole.Arn;
    }
  }

  if (invocationRoleArn) {
    Object.assign(params, {
      'invocationRole': invocationRoleArn
    });
  }

  const sourceArn = await getSourceArn(triggerType, triggerProperties);
  if (sourceArn) {
    Object.assign(params, {
      'sourceArn': sourceArn
    });
  }

  if (triggerProperties.Qualifier) {
    Object.assign(params, {
      'qualifier': triggerProperties.Qualifier
    });
  }

  if (!trigger) {
    params.triggerName = triggerName;
    trigger = await fc.createTrigger(serviceName, functionName, params);
  } else {
    if (triggerType === 'TableStore' || triggerType === 'MNSTopic') {
      // no triggerConfig, so no updateTrigger, first delete, then create
      // await fc.deleteTrigger(serviceName, functionName, triggerName);
      // params.triggerName = triggerName;
      // trigger = await fc.createTrigger(serviceName, functionName, params);
      console.log(red(`\t\tWarning: TableStore and MNSTopic Trigger cann't update`));
      return;
    }
    trigger = await fc.updateTrigger(serviceName, functionName, triggerName, params);
  }

  return trigger;
}