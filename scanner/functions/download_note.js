function download_note() {
    // Use directly the content of the note editor
    let content = note_editor.getValue();
    let filename = $('#currentNoteTitle').text() + '.md';
    let blob = new Blob([content], {type: 'text/plain'});
    let url = window.URL.createObjectURL(blob);

    // Create a link to the file and click it to download it
    let link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}