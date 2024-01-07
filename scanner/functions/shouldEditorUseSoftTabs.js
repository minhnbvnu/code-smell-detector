function shouldEditorUseSoftTabs(editor, tabType, softTabs) {
  switch (tabType) {
    case 'hard':
      return false;
    case 'soft':
      return true;
    case 'auto':
      switch (editor.usesSoftTabs()) {
        case true:
          return true;
        case false:
          return false;
        default:
          return softTabs;
      }
  }
}