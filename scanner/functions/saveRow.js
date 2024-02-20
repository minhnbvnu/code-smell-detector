function saveRow(newCursor) {
        cursor = newCursor;
        pushRow(row);
        row = [];
        nextNewline = input.indexOf(newline, cursor);
      }