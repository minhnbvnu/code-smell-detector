function ParserHandle(_config) {
    var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
    var self = this;
    var _stepCounter = 0;
    var _rowCounter = 0;
    var _input;
    var _parser;
    var _paused = false;
    var _aborted = false;
    var _delimiterError;
    var _fields = [];
    var _results = {
      data: [],
      errors: [],
      meta: {}
    };
    if (isFunction(_config.step)) {
      var userStep = _config.step;
      _config.step = function(results) {
        _results = results;
        if (needsHeaderRow())
          processResults();
        else {
          processResults();
          if (!_results.data || _results.data.length === 0)
            return;
          _stepCounter += results.data.length;
          if (_config.preview && _stepCounter > _config.preview)
            _parser.abort();
          else
            userStep(_results, self);
        }
      };
    }
    this.parse = function(input, baseIndex, ignoreLastRow) {
      var quoteChar = _config.quoteChar || '"';
      if (!_config.newline)
        _config.newline = guessLineEndings(input, quoteChar);
      _delimiterError = false;
      if (!_config.delimiter) {
        var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments, _config.delimitersToGuess);
        if (delimGuess.successful)
          _config.delimiter = delimGuess.bestDelimiter;
        else {
          _delimiterError = true;
          _config.delimiter = Papa.DefaultDelimiter;
        }
        _results.meta.delimiter = _config.delimiter;
      } else if (isFunction(_config.delimiter)) {
        _config.delimiter = _config.delimiter(input);
        _results.meta.delimiter = _config.delimiter;
      }
      var parserConfig = copy(_config);
      if (_config.preview && _config.header)
        parserConfig.preview++;
      _input = input;
      _parser = new Parser(parserConfig);
      _results = _parser.parse(_input, baseIndex, ignoreLastRow);
      processResults();
      return _paused ? { meta: { paused: true } } : _results || { meta: { paused: false } };
    };
    this.paused = function() {
      return _paused;
    };
    this.pause = function() {
      _paused = true;
      _parser.abort();
      _input = _input.substr(_parser.getCharIndex());
    };
    this.resume = function() {
      _paused = false;
      self.streamer.parseChunk(_input, true);
    };
    this.aborted = function() {
      return _aborted;
    };
    this.abort = function() {
      _aborted = true;
      _parser.abort();
      _results.meta.aborted = true;
      if (isFunction(_config.complete))
        _config.complete(_results);
      _input = "";
    };
    function testEmptyLine(s) {
      return _config.skipEmptyLines === "greedy" ? s.join("").trim() === "" : s.length === 1 && s[0].length === 0;
    }
    function processResults() {
      if (_results && _delimiterError) {
        addError("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + Papa.DefaultDelimiter + "'");
        _delimiterError = false;
      }
      if (_config.skipEmptyLines) {
        for (var i = 0; i < _results.data.length; i++)
          if (testEmptyLine(_results.data[i]))
            _results.data.splice(i--, 1);
      }
      if (needsHeaderRow())
        fillHeaderFields();
      return applyHeaderAndDynamicTypingAndTransformation();
    }
    function needsHeaderRow() {
      return _config.header && _fields.length === 0;
    }
    function fillHeaderFields() {
      if (!_results)
        return;
      function addHeder(header) {
        if (isFunction(_config.transformHeader))
          header = _config.transformHeader(header);
        _fields.push(header);
      }
      if (Array.isArray(_results.data[0])) {
        for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
          _results.data[i].forEach(addHeder);
        _results.data.splice(0, 1);
      } else
        _results.data.forEach(addHeder);
    }
    function shouldApplyDynamicTyping(field) {
      if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === void 0) {
        _config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
      }
      return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
    }
    function parseDynamic(field, value) {
      if (shouldApplyDynamicTyping(field)) {
        if (value === "true" || value === "TRUE")
          return true;
        else if (value === "false" || value === "FALSE")
          return false;
        else if (FLOAT.test(value))
          return parseFloat(value);
        else if (ISO_DATE.test(value))
          return new Date(value);
        else
          return value === "" ? null : value;
      }
      return value;
    }
    function applyHeaderAndDynamicTypingAndTransformation() {
      if (!_results || !_results.data || !_config.header && !_config.dynamicTyping && !_config.transform)
        return _results;
      function processRow(rowSource, i) {
        var row = _config.header ? {} : [];
        var j;
        for (j = 0; j < rowSource.length; j++) {
          var field = j;
          var value = rowSource[j];
          if (_config.header)
            field = j >= _fields.length ? "__parsed_extra" : _fields[j];
          if (_config.transform)
            value = _config.transform(value, field);
          value = parseDynamic(field, value);
          if (field === "__parsed_extra") {
            row[field] = row[field] || [];
            row[field].push(value);
          } else
            row[field] = value;
        }
        if (_config.header) {
          if (j > _fields.length)
            addError("FieldMismatch", "TooManyFields", "Too many fields: expected " + _fields.length + " fields but parsed " + j, _rowCounter + i);
          else if (j < _fields.length)
            addError("FieldMismatch", "TooFewFields", "Too few fields: expected " + _fields.length + " fields but parsed " + j, _rowCounter + i);
        }
        return row;
      }
      var incrementBy = 1;
      if (!_results.data[0] || Array.isArray(_results.data[0])) {
        _results.data = _results.data.map(processRow);
        incrementBy = _results.data.length;
      } else
        _results.data = processRow(_results.data, 0);
      if (_config.header && _results.meta)
        _results.meta.fields = _fields;
      _rowCounter += incrementBy;
      return _results;
    }
    function guessDelimiter(input, newline, skipEmptyLines, comments, delimitersToGuess) {
      var bestDelim, bestDelta, fieldCountPrevRow;
      delimitersToGuess = delimitersToGuess || [",", "	", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP];
      for (var i = 0; i < delimitersToGuess.length; i++) {
        var delim = delimitersToGuess[i];
        var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
        fieldCountPrevRow = void 0;
        var preview = new Parser({
          comments,
          delimiter: delim,
          newline,
          preview: 10
        }).parse(input);
        for (var j = 0; j < preview.data.length; j++) {
          if (skipEmptyLines && testEmptyLine(preview.data[j])) {
            emptyLinesCount++;
            continue;
          }
          var fieldCount = preview.data[j].length;
          avgFieldCount += fieldCount;
          if (typeof fieldCountPrevRow === "undefined") {
            fieldCountPrevRow = 0;
            continue;
          } else if (fieldCount > 1) {
            delta += Math.abs(fieldCount - fieldCountPrevRow);
            fieldCountPrevRow = fieldCount;
          }
        }
        if (preview.data.length > 0)
          avgFieldCount /= preview.data.length - emptyLinesCount;
        if ((typeof bestDelta === "undefined" || delta > bestDelta) && avgFieldCount > 1.99) {
          bestDelta = delta;
          bestDelim = delim;
        }
      }
      _config.delimiter = bestDelim;
      return {
        successful: !!bestDelim,
        bestDelimiter: bestDelim
      };
    }
    function guessLineEndings(input, quoteChar) {
      input = input.substr(0, 1024 * 1024);
      var re = new RegExp(escapeRegExp(quoteChar) + "([^]*?)" + escapeRegExp(quoteChar), "gm");
      input = input.replace(re, "");
      var r = input.split("\r");
      var n = input.split("\n");
      var nAppearsFirst = n.length > 1 && n[0].length < r[0].length;
      if (r.length === 1 || nAppearsFirst)
        return "\n";
      var numWithN = 0;
      for (var i = 0; i < r.length; i++) {
        if (r[i][0] === "\n")
          numWithN++;
      }
      return numWithN >= r.length / 2 ? "\r\n" : "\r";
    }
    function addError(type, code, msg, row) {
      _results.errors.push({
        type,
        code,
        message: msg,
        row
      });
    }
  }