function testSelection(name, before, pos, keys, sel) {
  return testVim(name, function(cm, vim, helpers) {
             var ch = before.search(pos)
             var line = before.substring(0, ch).split('\n').length - 1;
             if (line) {
               ch = before.substring(0, ch).split('\n').pop().length;
             }
             cm.setCursor(line, ch);
             helpers.doKeys.apply(this, keys.split(''));
             eq(sel, cm.getSelection());
           }, {value: before});
}