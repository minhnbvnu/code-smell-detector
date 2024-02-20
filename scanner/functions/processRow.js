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