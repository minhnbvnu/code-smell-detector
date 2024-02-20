function findBuildFuncs(buildName, tpl) {
  if (buildName) {
    const func = definition.findFunctionInTpl(buildName, tpl);

    if (_.isEmpty(func)) {
      throw new Error('invalid buildName ' + buildName);
    }

    return [func];
  }
  return definition.findFunctionsInTpl(tpl);
}