function onSelect(root, prompt, configPath) {
  return async function onAnswer(answer) {
    await prompt.clear();
    return answer == ".."
      ? docs(dirname(root), configPath)
      : docs(join(root, answer), configPath);
  };
}