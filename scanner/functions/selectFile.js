function selectFile(root, choices, configPath) {
  const prompt = new AutoComplete({
    name: "file",
    message: "Select a file or a directory",
    choices: ["..", ...choices],
  });
  prompt.run().then(onSelect(root, prompt, configPath)).catch(console.error);
}