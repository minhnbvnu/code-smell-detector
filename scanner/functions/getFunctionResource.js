async function getFunctionResource(serviceName, functionMeta, fullOutputDir, recursive, onlyConfig) {
  const functionResource = parseFunctionResource(functionMeta);
  const functionName = functionMeta.functionName;
  if (!onlyConfig) {
    await outputFunctionCode(serviceName, functionName, fullOutputDir);
    functionResource.Properties.CodeUri = getCodeUri(serviceName, functionName);
  } else {
    console.log(`    ${green('✔')} ${functionName} - ${grey('Function')}`);
  }

  if (recursive) {
    const triggerMetas = await getTriggerMetas(serviceName, functionName);
    if (triggerMetas && triggerMetas.length > 0) {
      functionResource.Events = {};
      for (const triggerMeta of triggerMetas) {
        debug('Trigger metadata: %s', triggerMeta);
        functionResource.Events[triggerMeta.triggerName] = parseTriggerResource(triggerMeta);
        console.log(`        ${green('✔')} ${triggerMeta.triggerName} - ${grey('Trigger')}`);
      }
    }
  }
  return functionResource;
}