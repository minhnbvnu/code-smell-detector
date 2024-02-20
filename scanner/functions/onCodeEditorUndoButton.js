function onCodeEditorUndoButton() {
    aceEditor.session.getUndoManager().undo();
}