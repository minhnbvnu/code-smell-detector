function getTagData(tagText) {
    var parts = [];
    var char = '';
    var lastChar = '';
    var i = 0;
    var s = 0;
    var n = 0;
    var n2 = 0;
    var currentString = '';
    var inQuotes = false;
    var attrParts = [];
    var key = '';
    var assignments = [];

    //build the parts of the tag
    for (i = 0, n = tagText.length; i < n; i++) {
      char = tagText[i];

      if (char === " " && inQuotes === false) {
        parts.push(currentString);
        currentString = '';
      } else if (char === "'") {
        if (inQuotes === false) {
          inQuotes = true;
        } else {
          inQuotes = false;
          parts.push(currentString);
          currentString = '';
        }
      } else if (char === '"') {
        if (inQuotes === false) {
          inQuotes = true;
        } else {
          inQuotes = false;
          parts.push(currentString);
          currentString = '';
        }
      } else {
        currentString += char;
      }
    }

    if (currentString !== "") {
      parts.push(currentString);
    }
    currentString = '';

    //loop through the parts of the tag
    for (i = 1, n = parts.length; i < n; i++) {
      attrParts = [];
      lastChar = '';
      currentString = '';

      for (s = 0, n2 = parts[i].length; s < n2; s++) {
        char = parts[i][s];

        //if the character is =, then we're able to split the attribute name and value
        if (char === "=") {
          attrParts.push(currentString);
          currentString = '';
        } else {
          currentString += char;
          lastChar = char;
        }
      }

      if (currentString != "") {
        attrParts.push(currentString);
      }
      if (attrParts.length > 1) {
        var matches = attrParts[1].match(/__\$props__\[\d*\]/g);
        if (matches !== null) {
          if (attrParts[0] === "@@assign") {
            assignments.push(attrParts[1]);
          } else {
            assignments.push(attrParts);
          }
        } else {
          assignments.push(attrParts);
          if (attrParts[0] === "key") key = attrParts[1];
        }
      }
    }

    //return the attributes and the tag name
    return {
      tag: parts[0],
      key: key,
      assignments: assignments,
    }
  }