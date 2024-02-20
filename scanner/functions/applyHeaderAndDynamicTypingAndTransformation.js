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