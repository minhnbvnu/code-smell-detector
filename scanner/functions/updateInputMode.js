function updateInputMode() {
        var isIntsert = getVim(cm).insertMode;
        cm.ace.renderer.setStyle("normal-mode", !isIntsert);
        editor.textInput.setCommandMode(!isIntsert);
        editor.renderer.$keepTextAreaAtCursor = isIntsert;
        editor.renderer.$blockCursor = !isIntsert;
      }