function persistentDialog(cm, text, deflt, onEnter, onKeyDown) {
    cm.openDialog(text, onEnter, {
      value: deflt,
      selectValueOnOpen: true,
      closeOnEnter: false,
      onClose: function() { clearSearch(cm); },
      onKeyDown: onKeyDown
    });
  }