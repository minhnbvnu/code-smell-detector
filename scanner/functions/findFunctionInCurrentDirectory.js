async function findFunctionInCurrentDirectory(invokeFunctionName) {
  const tpl = await getAndVerifyTpl();

  if (!invokeFunctionName) {
    const funcName = findFirstFunctionName(tpl);
    console.log(`\nMissing invokeName argument, Fun will use the first function ${yellow(funcName)} as invokeName\n`);

    const array = funcName.split('/');
    return {
      serviceName: _.first(array),
      functionName: _.last(array)
    };
  }

  const functions = findFunctionsInTpl(tpl, (functionName, functionRes) => {
    return functionName === invokeFunctionName;
  });

  if (functions.length === 1) {
    return {
      serviceName: _.first(functions).serviceName,
      functionName: _.first(functions).functionName
    };
  }

  if (functions.length > 1) {
    return await promptForFunctionSelection(functions);
  }

  throw new Error(`don't exit function: ${invokeFunctionName}`);
}