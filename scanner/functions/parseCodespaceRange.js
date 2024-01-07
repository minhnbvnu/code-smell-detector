function parseCodespaceRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if ((0, _primitives.isEOF)(obj)) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endcodespacerange")) {
        return;
      }

      if (!(0, _util.isString)(obj)) {
        break;
      }

      var low = strToInt(obj);
      obj = lexer.getObj();

      if (!(0, _util.isString)(obj)) {
        break;
      }

      var high = strToInt(obj);
      cMap.addCodespaceRange(obj.length, low, high);
    }

    throw new _util.FormatError("Invalid codespace range.");
  }