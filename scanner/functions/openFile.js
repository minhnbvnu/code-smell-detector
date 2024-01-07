function openFile(atom, { query }) {
  const { filename, line, column } = query;

  atom.workspace.open(filename, {
    initialLine: getLineColNumber(line),
    initialColumn: getLineColNumber(column),
    searchAllPanes: true
  });
}