async function promptForConfirmContinue(message) {
  if (!isInteractiveEnvironment()) { return true; }
  if (detectMocha()) { return true; }

  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'ok',
    message
  }]);

  if (answers.ok) {
    return true;
  }
  return false;
}