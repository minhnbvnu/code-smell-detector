function getLineNumberFromEntry(entry) {
  const lineNumber = entry[0];

  if (lineNumber == null) {
    throw new Error('Unexpected line number missing in entry in HookMap');
  }

  return lineNumber;
}