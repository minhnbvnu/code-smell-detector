function nameCompletion(cur, token, result, editor) {
    // Try to complete table, column names and return start position of completion
    var useIdentifierQuotes = false;
    var nameParts = [];
    var start = token.start;
    var cont = true;
    while (cont) {
      cont = (token.string.charAt(0) == ".");
      useIdentifierQuotes = useIdentifierQuotes || (token.string.charAt(0) == identifierQuote);

      start = token.start;
      nameParts.unshift(cleanName(token.string));

      token = editor.getTokenAt(Pos(cur.line, token.start));
      if (token.string == ".") {
        cont = true;
        token = editor.getTokenAt(Pos(cur.line, token.start));
      }
    }

    // Try to complete table names
    var string = nameParts.join(".");
    addMatches(result, string, tables, function(w) {
      return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
    });

    // Try to complete columns from defaultTable
    addMatches(result, string, defaultTable, function(w) {
      return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
    });

    // Try to complete columns
    string = nameParts.pop();
    var table = nameParts.join(".");

    var alias = false;
    var aliasTable = table;
    // Check if table is available. If not, find table by Alias
    if (!getTable(table)) {
      var oldTable = table;
      table = findTableByAlias(table, editor);
      if (table !== oldTable) alias = true;
    }

    var columns = getTable(table);
    if (columns && columns.columns)
      columns = columns.columns;

    if (columns) {
      addMatches(result, string, columns, function(w) {
        var tableInsert = table;
        if (alias == true) tableInsert = aliasTable;
        if (typeof w == "string") {
          w = tableInsert + "." + w;
        } else {
          w = shallowClone(w);
          w.text = tableInsert + "." + w.text;
        }
        return useIdentifierQuotes ? insertIdentifierQuotes(w) : w;
      });
    }

    return start;
  }