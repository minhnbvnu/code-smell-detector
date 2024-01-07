function parseCidChar(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if ((0, _primitives.isEOF)(obj)) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endcidchar")) {
        return;
      }

      expectString(obj);
      var src = strToInt(obj);
      obj = lexer.getObj();
      expectInt(obj);
      var dst = obj;
      cMap.mapOne(src, dst);
    }
  }