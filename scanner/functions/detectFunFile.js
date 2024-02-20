async function detectFunFile(baseDir, tpl) {
  const funfilePath = path.join(baseDir, 'Funfile');
  if (await fs.pathExists(funfilePath)) {

    const codeUris = findFunctionsInTpl(tpl).map(func => {
      return path.resolve(baseDir, func.functionRes.Properties.CodeUri);
    });

    if (!_.includes(codeUris, baseDir)) {
      console.warn(red(`\nFun detected that the '${path.resolve(funfilePath)}' is not included in any CodeUri.\nPlease make sure if it is the right configuration. if yes, ignore please.`));
    }
  }
}