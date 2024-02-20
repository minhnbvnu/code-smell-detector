function columnCompletion(result, editor) {
    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur);
    var string = token.string.substr(1);
    var prevCur = Pos(cur.line, token.start);
    var table = editor.getTokenAt(prevCur).string;
    if (!tables.hasOwnProperty(table))
      table = findTableByAlias(table, editor);
    var columns = tables[table];
    if (!columns) return;

    addMatches(result, string, columns, function(w) {return "." + w;});
  }