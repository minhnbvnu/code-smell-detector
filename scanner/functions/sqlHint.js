function sqlHint(editor, options) {
    tables = (options && options.tables) || {};
    keywords = keywords || getKeywords(editor);
    var cur = editor.getCursor();
    var token = editor.getTokenAt(cur), end = token.end;
    var result = [];
    var search = token.string.trim();

    if (search.charAt(0) == ".") {
      columnCompletion(result, editor);
      if (!result.length) {
        while (token.start && search.charAt(0) == ".") {
          token = editor.getTokenAt(Pos(cur.line, token.start - 1));
          search = token.string + search;
        }
        addMatches(result, search, tables,
                   function(w) {return w;});
      }
    } else {
      addMatches(result, search, keywords,
                 function(w) {return w.toUpperCase();});
      addMatches(result, search, tables,
                 function(w) {return w;});
    }

    return {
      list: result,
        from: Pos(cur.line, token.start),
        to: Pos(cur.line, end)
    };
  }