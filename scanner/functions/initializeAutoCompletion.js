function initializeAutoCompletion(ctx, options = {}) {
  const { cm, ed, Editor } = ctx;
  if (autocompleteMap.has(ed)) {
    return;
  }

  const win = ed.container.contentWindow.wrappedJSObject;
  const { CodeMirror } = win;

  let completer = null;
  const autocompleteKey =
    "Ctrl-" + Editor.keyFor("autocompletion", { noaccel: true });
  if (ed.config.mode == Editor.modes.css) {
    completer = new CSSCompleter({
      walker: options.walker,
      cssProperties: options.cssProperties,
      maxEntries: 1000,
    });
  }

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

  // Give each popup a new name to avoid sharing the elements.

  let popup = new AutocompletePopup(win.parent.document, {
    position: "bottom",
    autoSelect: true,
    onClick: insertSelectedPopupItem,
  });

  const cycle = reverse => {
    if (popup?.isOpen) {
      // eslint-disable-next-line mozilla/no-compare-against-boolean-literals
      cycleSuggestions(ed, reverse == true);
      return null;
    }

    return CodeMirror.Pass;
  };

  let keyMap = {
    Tab: cycle,
    Down: cycle,
    "Shift-Tab": cycle.bind(null, true),
    Up: cycle.bind(null, true),
    Enter: () => {
      const wasHandled = insertSelectedPopupItem();
      return wasHandled ? true : CodeMirror.Pass;
    },
  };

  const autoCompleteCallback = autoComplete.bind(null, ctx);
  const keypressCallback = onEditorKeypress.bind(null, ctx);
  keyMap[autocompleteKey] = autoCompleteCallback;
  cm.addKeyMap(keyMap);

  cm.on("keydown", keypressCallback);
  ed.on("change", autoCompleteCallback);
  ed.on("destroy", destroy);

  function destroy() {
    ed.off("destroy", destroy);
    cm.off("keydown", keypressCallback);
    ed.off("change", autoCompleteCallback);
    cm.removeKeyMap(keyMap);
    popup.destroy();
    keyMap = popup = completer = null;
    autocompleteMap.delete(ed);
  }

  autocompleteMap.set(ed, {
    popup: popup,
    completer: completer,
    keyMap: keyMap,
    destroy: destroy,
    insertingSuggestion: false,
    suggestionInsertedOnce: false,
  });
}