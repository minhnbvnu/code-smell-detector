function JsonToCsv(_input, _config) {
    var _quotes = false;
    var _writeHeader = true;
    var _delimiter = ",";
    var _newline = "\r\n";
    var _quoteChar = '"';
    var _escapedQuote = _quoteChar + _quoteChar;
    var _skipEmptyLines = false;
    var _columns = null;
    unpackConfig();
    var quoteCharRegex = new RegExp(escapeRegExp(_quoteChar), "g");
    if (typeof _input === "string")
      _input = JSON.parse(_input);
    if (Array.isArray(_input)) {
      if (!_input.length || Array.isArray(_input[0]))
        return serialize(null, _input, _skipEmptyLines);
      else if (typeof _input[0] === "object")
        return serialize(_columns || objectKeys(_input[0]), _input, _skipEmptyLines);
    } else if (typeof _input === "object") {
      if (typeof _input.data === "string")
        _input.data = JSON.parse(_input.data);
      if (Array.isArray(_input.data)) {
        if (!_input.fields)
          _input.fields = _input.meta && _input.meta.fields;
        if (!_input.fields)
          _input.fields = Array.isArray(_input.data[0]) ? _input.fields : objectKeys(_input.data[0]);
        if (!Array.isArray(_input.data[0]) && typeof _input.data[0] !== "object")
          _input.data = [_input.data];
      }
      return serialize(_input.fields || [], _input.data || [], _skipEmptyLines);
    }
    throw new Error("Unable to serialize unrecognized input");
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
    function objectKeys(obj) {
      if (typeof obj !== "object")
        return [];
      var keys = [];
      for (var key in obj)
        keys.push(key);
      return keys;
    }
    function serialize(fields, data, skipEmptyLines) {
      var csv = "";
      if (typeof fields === "string")
        fields = JSON.parse(fields);
      if (typeof data === "string")
        data = JSON.parse(data);
      var hasHeader = Array.isArray(fields) && fields.length > 0;
      var dataKeyedByField = !Array.isArray(data[0]);
      if (hasHeader && _writeHeader) {
        for (var i = 0; i < fields.length; i++) {
          if (i > 0)
            csv += _delimiter;
          csv += safe(fields[i], i);
        }
        if (data.length > 0)
          csv += _newline;
      }
      for (var row = 0; row < data.length; row++) {
        var maxCol = hasHeader ? fields.length : data[row].length;
        var emptyLine = false;
        var nullLine = hasHeader ? Object.keys(data[row]).length === 0 : data[row].length === 0;
        if (skipEmptyLines && !hasHeader) {
          emptyLine = skipEmptyLines === "greedy" ? data[row].join("").trim() === "" : data[row].length === 1 && data[row][0].length === 0;
        }
        if (skipEmptyLines === "greedy" && hasHeader) {
          var line = [];
          for (var c = 0; c < maxCol; c++) {
            var cx = dataKeyedByField ? fields[c] : c;
            line.push(data[row][cx]);
          }
          emptyLine = line.join("").trim() === "";
        }
        if (!emptyLine) {
          for (var col = 0; col < maxCol; col++) {
            if (col > 0 && !nullLine)
              csv += _delimiter;
            var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
            csv += safe(data[row][colIdx], col);
          }
          if (row < data.length - 1 && (!skipEmptyLines || maxCol > 0 && !nullLine)) {
            csv += _newline;
          }
        }
      }
      return csv;
    }
    function safe(str, col) {
      if (typeof str === "undefined" || str === null)
        return "";
      if (str.constructor === Date)
        return JSON.stringify(str).slice(1, 25);
      str = str.toString().replace(quoteCharRegex, _escapedQuote);
      var needsQuotes = typeof _quotes === "boolean" && _quotes || Array.isArray(_quotes) && _quotes[col] || hasAny(str, Papa.BAD_DELIMITERS) || str.indexOf(_delimiter) > -1 || str.charAt(0) === " " || str.charAt(str.length - 1) === " ";
      return needsQuotes ? _quoteChar + str + _quoteChar : str;
    }
    function hasAny(str, substrings) {
      for (var i = 0; i < substrings.length; i++)
        if (str.indexOf(substrings[i]) > -1)
          return true;
      return false;
    }
  }