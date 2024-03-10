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