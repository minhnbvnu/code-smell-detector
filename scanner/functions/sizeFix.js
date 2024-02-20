function sizeFix() {
    if(dialog.data('collapsed')) return;

    var options = dialog.dialog('option');
    dialog.dialog('option', 'height', options.height);
    dialog.dialog('option', 'width', options.width);
  }