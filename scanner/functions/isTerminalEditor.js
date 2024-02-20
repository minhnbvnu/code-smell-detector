function isTerminalEditor(editor) {
  switch (editor) {
    case 'vim':
    case 'emacs':
    case 'nano':
      return true;
  }
  return false;
}