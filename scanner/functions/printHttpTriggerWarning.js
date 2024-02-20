async function printHttpTriggerWarning(httpTrigger, serviceName, functionName) {
  const profile = await getProfile();

  const triggerNames = httpTrigger.map(p => p.triggerName).join(',');

  console.warn(red(`\n  Currently fun invoke does not support functions with HTTP trigger`));
  console.warn(`\n  function(name: ${functionName}) with http trigger(name: ${triggerNames}) can only be invoked with http trigger URL.`);

  httpTrigger.forEach(trigger => {
    displayTriggerInfo(trigger, profile.accountId, profile.defaultRegion, serviceName, functionName);
  });

  console.log(`\n  users can make remote calls through console, postman or fcli command line tools.`);
}