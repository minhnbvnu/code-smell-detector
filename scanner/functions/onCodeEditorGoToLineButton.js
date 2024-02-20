function onCodeEditorGoToLineButton() {
    const result = parseInt(window.prompt("Go to line:", ""));
    if (! isNaN(result)) {
        aceEditor.gotoLine(result, 0, true);
        aceEditor.focus();
    }
}