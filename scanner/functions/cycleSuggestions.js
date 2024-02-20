function cycleSuggestions(ed, reverse) {
  const autocompleteOpts = autocompleteMap.get(ed);
  const { popup } = autocompleteOpts;
  const cur = ed.getCursor();
  autocompleteOpts.insertingSuggestion = true;
  if (!autocompleteOpts.suggestionInsertedOnce) {
    autocompleteOpts.suggestionInsertedOnce = true;
    let firstItem;
    if (reverse) {
      firstItem = popup.getItemAtIndex(popup.itemCount - 1);
      popup.selectPreviousItem();
    } else {
      firstItem = popup.getItemAtIndex(0);
      if (firstItem.label == firstItem.preLabel && popup.itemCount > 1) {
        firstItem = popup.getItemAtIndex(1);
        popup.selectNextItem();
      }
    }
    if (popup.itemCount == 1) {
      popup.hidePopup();
    }
    insertPopupItem(ed, firstItem);
  } else {
    const fromCur = {
      line: cur.line,
      ch: cur.ch - popup.selectedItem.text.length,
    };
    if (reverse) {
      popup.selectPreviousItem();
    } else {
      popup.selectNextItem();
    }
    ed.replaceText(popup.selectedItem.text, fromCur, cur);
  }
  // This event is used in tests.
  ed.emit("suggestion-entered");
}