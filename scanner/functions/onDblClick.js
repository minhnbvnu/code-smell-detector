function onDblClick() {
    that.TEXTAREA.value = that.originalValue;
    that.instance.destroyEditor();
    that.beginEditing(row, col, prop, true);
  }