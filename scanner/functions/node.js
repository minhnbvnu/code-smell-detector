function node(type, value, line, column, key) {
        var obj = { type: type, value: value, line: line(), column: column() };
        if (key) obj.key = key;
        return obj;
      }