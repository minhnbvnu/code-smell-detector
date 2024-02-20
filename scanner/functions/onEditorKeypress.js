function onEditorKeypress({ ed, Editor }, cm, event) {
  const autocompleteOpts = autocompleteMap.get(ed);

  // Do not try to autocomplete with multiple selections.
  if (ed.hasMultipleSelections()) {
    autocompleteOpts.doNotAutocomplete = true;
    autocompleteOpts.popup.hidePopup();
    return;
  }

  if (
    (event.ctrlKey || event.metaKey) &&
    event.keyCode == KeyCodes.DOM_VK_SPACE
  ) {
    // When Ctrl/Cmd + Space is pressed, two simultaneous keypresses are emitted
    // first one for just the Ctrl/Cmd and second one for combo. The first one
    // leave the autocompleteOpts.doNotAutocomplete as true, so we have to make
    // it false
    autocompleteOpts.doNotAutocomplete = false;
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) {
    autocompleteOpts.doNotAutocomplete = true;
    autocompleteOpts.popup.hidePopup();
    return;
  }

  switch (event.keyCode) {
    case KeyCodes.DOM_VK_RETURN:
      autocompleteOpts.doNotAutocomplete = true;
      break;
    case KeyCodes.DOM_VK_ESCAPE:
      if (autocompleteOpts.popup.isOpen) {
        // Prevent the Console input to open, but still remove the autocomplete popup.
        autocompleteOpts.doNotAutocomplete = true;
        autocompleteOpts.popup.hidePopup();
        event.preventDefault();
      }
      break;
    case KeyCodes.DOM_VK_LEFT:
    case KeyCodes.DOM_VK_RIGHT:
    case KeyCodes.DOM_VK_HOME:
    case KeyCodes.DOM_VK_END:
      autocompleteOpts.doNotAutocomplete = true;
      autocompleteOpts.popup.hidePopup();
      break;
    case KeyCodes.DOM_VK_BACK_SPACE:
    case KeyCodes.DOM_VK_DELETE:
      if (ed.config.mode == Editor.modes.css) {
        autocompleteOpts.completer.invalidateCache(ed.getCursor().line);
      }
      autocompleteOpts.doNotAutocomplete = true;
      autocompleteOpts.popup.hidePopup();
      break;
    default:
      autocompleteOpts.doNotAutocomplete = false;
  }
}