function nonspaceAfter(ch, str) {
    nonspace.lastIndex = ch;
    var m = nonspace.exec(str);
    return m ? m.index : -1;
  }