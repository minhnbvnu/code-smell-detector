async function mergeTplWithoutBuildYml(templates = [], invokeName) {
  let isDotnetcore = false;
  const { tpl, tplPath } = await generateMergedTpl(templates, false, [], false);
  if (!invokeName) {
    invokeName = definition.findFirstFunctionName(tpl);
  }
  const { serviceName, serviceRes, functionName, functionRes } = definition.findFunctionInTpl(invokeName, tpl);
  if (functionRes && functionRes.Properties.Runtime === 'dotnetcore2.1') {
    isDotnetcore = true;
  }

  return {
    isDotnetcore,
    tpl, tplPath,
    serviceName, serviceRes,
    functionName, functionRes
  };
}