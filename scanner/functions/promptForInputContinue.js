async function promptForInputContinue(message, defaultValue) {

  const answers = await inquirer.prompt([{
    type: 'input',
    name: 'input',
    message,
    default: defaultValue
  }]);

  return answers;
}