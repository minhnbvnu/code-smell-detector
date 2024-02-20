function textObjectManipulation(cm, object, remove, insert, inclusive) {
    // Object is the text object, delete object if remove is true, enter insert
    // mode if insert is true, inclusive is the difference between a and i
    var tmp = textObjects[object](cm, inclusive);
    var start = tmp.start;
    var end = tmp.end;

    if ((start.line > end.line) || (start.line == end.line && start.ch > end.ch)) var swap = true ;

    pushInBuffer(cm.getRange(swap ? end : start, swap ? start : end));
    if (remove) cm.replaceRange("", swap ? end : start, swap ? start : end);
    if (insert) cm.setOption('keyMap', 'vim-insert');
  }