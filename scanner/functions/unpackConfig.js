function unpackConfig() {
      if (typeof _config !== "object")
        return;
      if (typeof _config.delimiter === "string" && !Papa.BAD_DELIMITERS.filter(function(value) {
        return _config.delimiter.indexOf(value) !== -1;
      }).length) {
        _delimiter = _config.delimiter;
      }
      if (typeof _config.quotes === "boolean" || Array.isArray(_config.quotes))
        _quotes = _config.quotes;
      if (typeof _config.skipEmptyLines === "boolean" || typeof _config.skipEmptyLines === "string")
        _skipEmptyLines = _config.skipEmptyLines;
      if (typeof _config.newline === "string")
        _newline = _config.newline;
      if (typeof _config.quoteChar === "string")
        _quoteChar = _config.quoteChar;
      if (typeof _config.header === "boolean")
        _writeHeader = _config.header;
      if (Array.isArray(_config.columns)) {
        if (_config.columns.length === 0)
          throw new Error("Option columns is empty");
        _columns = _config.columns;
      }
      if (_config.escapeChar !== void 0) {
        _escapedQuote = _config.escapeChar + _quoteChar;
      }
    }