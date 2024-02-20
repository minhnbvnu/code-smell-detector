function setCodeEditorFontSize(f) {
    codeEditorFontSize = Math.max(6, Math.min(32, f));
    localStorage.setItem('codeEditorFontSize', '' + codeEditorFontSize)

    if (useIDE) {
        aceEditor.setOption('fontSize', codeEditorFontSize + 'px');
    }
}