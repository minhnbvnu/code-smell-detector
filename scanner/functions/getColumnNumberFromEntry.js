function getColumnNumberFromEntry(entry) {
  const columnNumber = entry[1];

  if (columnNumber == null) {
    throw new Error('Unexpected column number missing in entry in HookMap');
  }

  return columnNumber;
}