function setCodeEditorSession(url, assetName) {
    console.assert(url);
    setEditorTitle(url);
    if (aceEditor.session.errorMarker) { aceEditor.session.removeMarker(aceEditor.session.errorMarker); }
    const contents = fileContents[url] || '';
    const session = codeEditorSessionMap.get(url) || createCodeEditorSession(url, contents, assetName);
    aceEditor.setSession(session);
    aceEditor.setReadOnly(session.aux.readOnly || ! editableProject);

    document.getElementById('codeEditorUndoContainer').enabled =
        document.getElementById('codeEditorRedoContainer').enabled =
          aceEditor.getReadOnly();
    
    // Reset the mode so that it is visible
    setCodeEditorSessionMode(session, session.aux.mode);
}