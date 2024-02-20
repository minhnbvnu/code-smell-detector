function insertSelectedPopupItem() {
    const autocompleteState = autocompleteMap.get(ed);
    if (!popup || !popup.isOpen || !autocompleteState) {
      return false;
    }

    if (!autocompleteState.suggestionInsertedOnce && popup.selectedItem) {
      autocompleteMap.get(ed).insertingSuggestion = true;
      insertPopupItem(ed, popup.selectedItem);
    }

    popup.once("popup-closed", () => {
      // This event is used in tests.
      ed.emit("popup-hidden");
    });
    popup.hidePopup();
    return true;
  }