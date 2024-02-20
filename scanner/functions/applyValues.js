function applyValues(string, values) {
    var index = 0;
    var re = /__\$props__\[([0-9]*)\]/;

    var placeholders = string.match(/__\$props__\[([0-9]*)\]/g);
    if (placeholders != null) {
        for (var i = 0; i < placeholders.length; i++) {
          index = re.exec(placeholders[i])[1];
          string = string.replace(placeholders[i], values[index]);
        }
      }
    return string;
  }