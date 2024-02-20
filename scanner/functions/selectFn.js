function selectFn(root, fns, configPath) {
  const fnMap = Object.fromEntries(fns.map((fn) => [fn.name, fn]));
  const prompt = new AutoComplete({
    name: "function",
    message: "Select a function",
    choices: ["..", ...Object.keys(fnMap)],
  });
  prompt
    .run()
    .then(onFnSelect(root, fnMap, prompt, configPath))
    .catch(console.error);
}