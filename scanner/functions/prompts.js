function prompts(promptList) {
  return new Promise(function (resolve) {
    return inquirer.prompt(promptList).then((answers) => {
      resolve(answers);
    });
  });
}