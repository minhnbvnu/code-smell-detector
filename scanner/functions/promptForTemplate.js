async function promptForTemplate(templates) {
  return inquirer.prompt([{
    type: 'autocomplete',
    name: 'template',
    message: 'Select a template to init',
    pageSize: 16,
    source: async (answersForFar, input) => {
      input = input || '';
      return templates.filter(t => t.toLowerCase().includes(input.toLowerCase()));
    }
  }]).then(answers => {
    return answers.template;
  });
}