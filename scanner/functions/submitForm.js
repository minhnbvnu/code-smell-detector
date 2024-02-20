function submitForm(generatorName, answers) {
  ipcRenderer.send('context-generator', 'generator:prompt-answer', answers);
  return {
    type: SUBMIT_FORM,
    answers
  };
}