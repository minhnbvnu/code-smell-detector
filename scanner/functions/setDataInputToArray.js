function setDataInputToArray(row, prop_or_col, value) {
    if (typeof row === "object") { //is it an array of changes
      return row;
    }
    else if ($.isPlainObject(value)) { //backwards compatibility
      return value;
    }
    else {
      return [
        [row, prop_or_col, value]
      ];
    }
  }