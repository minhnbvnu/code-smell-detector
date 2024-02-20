async function promptForConfig(context) {
  let userPrompt = context.config.userPrompt;

  if (isEmpty(userPrompt)) {
    return;
  }
  if (!isArray(userPrompt)) {
    userPrompt = [userPrompt];
  }
  const questions = userPrompt.filter(q => !(q.name in context.vars));
  if (isEmpty(questions)) {
    return;
  }
  if (context.input) {
    debug('Config Need prompt.');
    Object.assign(context.vars, await inquirer.prompt(questions));
  } else {
    debug('Config does not need prompt.');
    const defaultVars = {};
    questions.forEach(q => {
      defaultVars[q.name] = q.default;
    });
    context.vars = Object.assign(defaultVars, context.vars);
  }

}