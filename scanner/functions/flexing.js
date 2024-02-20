function flexing(input) {
  const cmdLines = input
    .replace(/\r\n/g, `\n`)
    .split("\n")
    .filter((v) => !!v);
  const cmds = getCmd(cmdLines);

  return cmds;
}