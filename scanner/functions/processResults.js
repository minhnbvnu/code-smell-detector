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