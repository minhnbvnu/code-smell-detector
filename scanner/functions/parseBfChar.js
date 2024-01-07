function parseBfChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if ((0, _primitives.isEOF)(obj)) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endbfchar")) {
        return;
      }

      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }