async function promptForFunctionSelection(functions, message = 'select a function?') {
  const choicesFuntions = functions.map(func => {
    return func.serviceName + '/' + func.functionName;
  });
  return inquirer.prompt([
    {
      type: 'list',
      message,
      name: 'function',
      choices: choicesFuntions
    }
  ]).then(answers => {
    const splitFunc = _.split(answers.function, '/');
    return {
      serviceName: _.first(splitFunc),
      functionName: _.last(splitFunc)
    };
  });
}