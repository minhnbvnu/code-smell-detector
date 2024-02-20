function searchForISO6391(language, columnsToSearch) {
  for (let i = 0; i < langs.length; i++) {
    for (let colI = 0; colI < columnsToSearch.length; colI++) {
      const column = columnsToSearch[colI];
      const columnValue = langs[i][COLUMN_TO_LANG_INDEX[column]];
      if (columnValue.split(', ').map(x => x.toLowerCase()).indexOf(language) != -1) {
        return langs[i][COLUMN_TO_LANG_INDEX['ISO 639-1']];
      }
    }
  }
  return null;
}