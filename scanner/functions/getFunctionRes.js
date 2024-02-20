async function getFunctionRes(funcPath) {
  if (funcPath) {
    const tplPath = await detectTplPath(false);
    if (!tplPath || !path.basename(tplPath).startsWith('template')) {
      throw new Error(`Error: Can't find template file at ${process.cwd()}.`);
    }

    await validate(tplPath);

    const tpl = await getTpl(tplPath);
    const { functionRes } = findFunctionInTpl(funcPath, tpl);
    if (!functionRes) {
      throw new Error(`Error: function ${funcPath} not found in ${tplPath}`);
    }
    return functionRes;
  }
  return undefined;
}