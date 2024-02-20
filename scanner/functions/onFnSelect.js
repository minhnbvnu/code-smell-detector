function onFnSelect(root, fnMap, prompt, configPath) {
  return async function onAnswer(answer) {
    await prompt.clear();
    return answer == ".."
      ? docs(dirname(root))
      : docsFn(root, answer, fnMap[answer], configPath);
  };
}