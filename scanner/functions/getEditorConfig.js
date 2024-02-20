function getEditorConfig(value) {
  return {
    value: value || constants["p" /* DEFAULT_DATA */],
    language: constants["C" /* LANGUAGE_JSON */],
    minimap: {
      enabled: false
    },
    fontFamily: constants["r" /* DEFAULT_FONT_FAMILY */],
    fontSize: 13,
    contextmenu: true,
    scrollBeyondLastLine: false,
    folding: true,
    showFoldingControls: constants["R" /* SHOW_FOLDING_CONTROLS */],
    useTabStops: true,
    wordBasedSuggestions: true,
    quickSuggestions: true,
    suggestOnTriggerCharacters: true
  };
}