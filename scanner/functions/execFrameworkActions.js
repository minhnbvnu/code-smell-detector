async function execFrameworkActions(codeDir, baseDir, framework) {
  const actions = framework.actions;

  if (actions) {
    for (const action of actions) {
      const condition = action.condition;

      if (_.isBoolean(condition)) {
        if (!condition) { continue; }
      } else if (condition) {
        const checkResult = await checkRules(codeDir, condition);
        debug(`action condition ${JSON.stringify(condition, null, 4)}, checkResult ${checkResult}`);

        if (!checkResult) { continue; }
      } else {
        throw new Error(`not supported condition value ${condition}`);
      }

      const processors = action.processors;
      for (const processor of processors) {
        await execProcessor(codeDir, baseDir, processor);
      }

      // only one matched action will be executed
      break;
    }
  }
}