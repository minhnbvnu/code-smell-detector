function initEditor () {
  const Editor = require('devtools/client/shared/sourceeditor/editor');

  const extraKeys = {
    [Editor.accel('S')]: save,
    'F3': 'findNext',
    'Shift-F3': 'findPrev'
  };

  const lineWrapping = xPref.get(UC.styloaix.PREF_LINEWRAPPING);
  document.getElementById('wrap-lines').checked = lineWrapping;

  sourceEditor = new Editor({
    mode: Editor.modes.css,
    contextMenu: 'sourceEditorContextMenu',
    extraKeys: extraKeys,
    lineNumbers: true,
    lineWrapping: lineWrapping,
    value: initialCode,
    maxHighlightLength: 10000
  });
  
  sourceEditor.setupAutoCompletion = function () {
    this.extend(require_mini('userchromejs/content/styloaix/autocomplete'));
    this.initializeAutoCompletion();
  };

  document.getElementById('editor').selectedIndex = 1;

  sourceEditor.appendTo(document.getElementById('sourceeditor')).then(function () {
    sourceEditor.insertCommandsController();
    sourceEditor.focus();
    if (isInstantCheck)
      checkForErrors();
  });

  sourceEditor.on('change', function () {
    changed();
    if (!isInstantCheck)
      toggleUI('check-for-errors-button', true);
  });
}