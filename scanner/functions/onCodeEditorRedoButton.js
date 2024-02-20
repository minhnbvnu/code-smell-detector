function onCodeEditorRedoButton() {
    aceEditor.session.getUndoManager().redo();
}