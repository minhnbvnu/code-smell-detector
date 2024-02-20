function consoleTablePolyfill(rows) {
    // convert object -> array
    if (!Array.isArray(rows)) {
      var data = rows;
      rows = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var row = data[key];
          row[OBJECT_COLUMN_NAME] = key;
          rows.push(row);
        }
      }
    }
    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }

    var columns = Object.keys(rows[0]).sort();
    var stringRows = [];
    var columnWidths = [];

    // Convert each cell to a string. Also
    // figure out max cell width for each column
    columns.forEach(function(k, i) {
      columnWidths[i] = k.length;
      for (var j = 0; j < rows.length; j++) {
        var cellStr = rows[j][k].toString();
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });

    // Join all elements in the row into a single string with | separators
    // (appends extra spaces to each cell to make separators  | alligned)
    var joinRow = function(row, space) {
      var cells = row.map(function(cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return cells.join(space + '|' + space);
    };

    var separators = columnWidths.map(function(columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators, '-');
    var header = joinRow(columns);
    var table = [header, separatorRow];

    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }

    // Notice extra empty line at the beginning.
    // Native logging hook adds "RCTLog >" at the front of every
    // logged string, which would shift the header and screw up
    // the table
    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }