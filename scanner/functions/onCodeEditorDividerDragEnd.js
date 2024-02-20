function onCodeEditorDividerDragEnd() {
    if (codeEditorDividerInDrag) {
        codeEditorDividerInDrag = false;	
        document.getElementById('codePlusFrame').style.cursor = 'auto';
        aceEditor.resize();
    }
}