function submitSelectedFolder(generatorName, answers) {
  ipcRenderer.send('context-generator', 'generator:run', generatorName, answers.cwd);
  return {
    type: SUBMIT_SELECTED_FOLDER,
    generatorName,
    answers
  };
}