function enterInsertMode(cm) {
    // enter insert mode: switch mode and cursor
    popCount();
    cm.setOption("keyMap", "vim-insert");
  }