function autoComplete({ ed, cm }) {
  const autocompleteOpts = autocompleteMap.get(ed);
  const { completer, popup } = autocompleteOpts;
  if (
    !completer ||
    autocompleteOpts.insertingSuggestion ||
    autocompleteOpts.doNotAutocomplete
  ) {
    autocompleteOpts.insertingSuggestion = false;
    return;
  }
  const cur = ed.getCursor();
  completer
    .complete(cm.getRange({ line: 0, ch: 0 }, cur), cur)
    .then(suggestions => {
      if (
        !suggestions ||
        !suggestions.length ||
        suggestions[0].preLabel == null
      ) {
        autocompleteOpts.suggestionInsertedOnce = false;
        popup.once("popup-closed", () => {
          // This event is used in tests.
          ed.emit("after-suggest");
        });
        popup.hidePopup();
        return;
      }
      // The cursor is at the end of the currently entered part of the token,
      // like "backgr|" but we need to open the popup at the beginning of the
      // character "b". Thus we need to calculate the width of the entered part
      // of the token ("backgr" here).

      const cursorElement = cm.display.cursorDiv.querySelector(
        ".CodeMirror-cursor"
      );
      const left = suggestions[0].preLabel.length * cm.defaultCharWidth();
      popup.hidePopup();
      popup.setItems(suggestions);

      popup.once("popup-opened", () => {
        // This event is used in tests.
        ed.emit("after-suggest");
      });
      popup.openPopup(cursorElement, -1 * left, 0);
      autocompleteOpts.suggestionInsertedOnce = false;
    })
    .catch(console.error);
}