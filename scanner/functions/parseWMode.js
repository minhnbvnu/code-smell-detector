function parseWMode(cMap, lexer) {
    var obj = lexer.getObj();

    if (Number.isInteger(obj)) {
      cMap.vertical = !!obj;
    }
  }