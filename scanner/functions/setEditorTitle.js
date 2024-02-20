function setEditorTitle(url) {
    const editorTitle = document.getElementById('editorTitle');
    editorTitle.innerHTML = url.replace(/^.*\//, '').replace(/[<>&]/g, '');
    editorTitle.title = url;
}