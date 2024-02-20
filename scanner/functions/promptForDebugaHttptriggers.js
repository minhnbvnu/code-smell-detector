async function promptForDebugaHttptriggers(httpTriggers, message = 'select a function to debug?') {
  const choicesFuntions = httpTriggers.map(httpTrigger => {
    if (httpTrigger.path) {
      return httpTrigger.path + ':' + httpTrigger.serviceName + '/' + httpTrigger.functionName;
    }
    return httpTrigger.serviceName + '/' + httpTrigger.functionName;
  });
  return inquirer.prompt([
    {
      type: 'list',
      message,
      name: 'function',
      choices: choicesFuntions
    }
  ]).then(answers => {

    let path;
    let slashSplit;

    const colonSplit = _.split(answers.function, ':');
    if (colonSplit.length !== 1) {
      slashSplit = _.split(colonSplit[1], '/');
      path = colonSplit[0];
    } else {
      slashSplit = _.split(answers.function, '/');
    }
    return {
      path,
      serviceName: _.first(slashSplit),
      functionName: _.last(slashSplit)
    };
  });
}