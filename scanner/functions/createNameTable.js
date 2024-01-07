function createNameTable(name, proto) {
    if (!proto) {
      proto = [[], []];
    }

    var strings = [proto[0][0] || "Original licence", proto[0][1] || name, proto[0][2] || "Unknown", proto[0][3] || "uniqueID", proto[0][4] || name, proto[0][5] || "Version 0.11", proto[0][6] || "", proto[0][7] || "Unknown", proto[0][8] || "Unknown", proto[0][9] || "Unknown"];
    var stringsUnicode = [];
    var i, ii, j, jj, str;

    for (i = 0, ii = strings.length; i < ii; i++) {
      str = proto[1][i] || strings[i];
      var strBufUnicode = [];

      for (j = 0, jj = str.length; j < jj; j++) {
        strBufUnicode.push(string16(str.charCodeAt(j)));
      }

      stringsUnicode.push(strBufUnicode.join(""));
    }

    var names = [strings, stringsUnicode];
    var platforms = ["\x00\x01", "\x00\x03"];
    var encodings = ["\x00\x00", "\x00\x01"];
    var languages = ["\x00\x00", "\x04\x09"];
    var namesRecordCount = strings.length * platforms.length;
    var nameTable = "\x00\x00" + string16(namesRecordCount) + string16(namesRecordCount * 12 + 6);
    var strOffset = 0;

    for (i = 0, ii = platforms.length; i < ii; i++) {
      var strs = names[i];

      for (j = 0, jj = strs.length; j < jj; j++) {
        str = strs[j];
        var nameRecord = platforms[i] + encodings[i] + languages[i] + string16(j) + string16(str.length) + string16(strOffset);
        nameTable += nameRecord;
        strOffset += str.length;
      }
    }

    nameTable += strings.join("") + stringsUnicode.join("");
    return nameTable;
  }