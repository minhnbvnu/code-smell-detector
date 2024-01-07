function parseBfRange(cMap, lexer) {
    while (true) {
      var obj = lexer.getObj();

      if ((0, _primitives.isEOF)(obj)) {
        break;
      }

      if ((0, _primitives.isCmd)(obj, "endbfrange")) {
        return;
      }

      expectString(obj);
      var low = strToInt(obj);
      obj = lexer.getObj();
      expectString(obj);
      var high = strToInt(obj);
      obj = lexer.getObj();

      if (Number.isInteger(obj) || (0, _util.isString)(obj)) {
        var dstLow = Number.isInteger(obj) ? String.fromCharCode(obj) : obj;
        cMap.mapBfRange(low, high, dstLow);
      } else if ((0, _primitives.isCmd)(obj, "[")) {
        obj = lexer.getObj();
        var array = [];

        while (!(0, _primitives.isCmd)(obj, "]") && !(0, _primitives.isEOF)(obj)) {
          array.push(obj);
          obj = lexer.getObj();
        }

        cMap.mapBfRangeToArray(low, high, array);
      } else {
        break;
      }
    }

    throw new _util.FormatError("Invalid bf range.");
  }