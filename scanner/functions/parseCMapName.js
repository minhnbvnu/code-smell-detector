function parseCMapName(cMap, lexer) {
    var obj = lexer.getObj();

    if ((0, _primitives.isName)(obj) && (0, _util.isString)(obj.name)) {
      cMap.name = obj.name;
    }
  }