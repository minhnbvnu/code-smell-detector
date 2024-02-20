function docsFn(root, name, info, configPath) {
  const doc = [
    info.returns ? `@returns ${info.returns}` : null,
    info.accepts ? `@accepts ${info.accepts.join(" ")}` : null,
    info.params.lengh ? `@params  ${info.params.join(" ")}` : null,
    " ",
    info.description,
  ]
    .filter(Boolean)
    .join("\n");
  console.log(
    [yellow(`Showing docs for ${root}:${name}\n`), colorize(doc), ""].join("\n")
  );
  const prompt = new enquirer.Toggle({
    name: "docs",
    message: "Exit?",
    enabled: "Yes",
    disabled: "..",
    initial: true,
  });
  prompt
    .run()
    .then((answer) => {
      prompt.clear();
      if (!answer) return docsFile(root, configPath);
    })
    .catch(console.error);
}