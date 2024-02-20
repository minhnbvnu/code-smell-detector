function delayReloadEditor() {
    setTimeout(() => { monacoEditor.evaluateCode(); }, 0);
}