async function deployTriggers(serviceName, functionName, events, tplPath) {
  if (_.isEmpty(events)) { return; }

  let localTriggerNames = Object.keys(events);
  let onLineTriggerNames = await getTriggerNameList({ serviceName, functionName });

  onLineTriggerNames.filter(x => !_.includes(localTriggerNames, x)).forEach(element => {
    console.warn(red(`\t\tThe trigger ${element} you configured in fc console does not match the local configuration.\n\t\tFun will not modify this trigger. You can remove this trigger manually through fc console if necessary`));
  });

  for (const [triggerName, triggerDefinition] of Object.entries(events)) {
    console.log(`\t\tWaiting for ${yellow(triggerDefinition.Type)} trigger ${triggerName} to be deployed...`);
    await deployTrigger(serviceName, functionName, triggerName, triggerDefinition);
    const tpl = await getTpl(tplPath);
    await displayTriggerInfo(serviceName, functionName, triggerName, triggerDefinition.Type, triggerDefinition.Properties, '\t\t', tpl);
    console.log(green(`\t\ttrigger ${triggerName} deploy success`));
  }
}