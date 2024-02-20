function fetchNotes(searchInput) {
    // Send a GET request to the server with the search input as a parameter
    get_raw_request_api('/case/notes/search?search_input=' + encodeURIComponent(searchInput) + '&cid=' + get_caseid())
        .done(data => {
            if (notify_auto_api(data, true)) {
                $('.directory-container').find('li').hide();
                $('.directory').hide();
                $('.note').hide();

                data.data.forEach(note => {
                    // Show the note
                    $('#note-' + note.note_id).show();

                    // Show all ancestor directories of the note
                    let parentDirectory = $('#directory-' + note.directory_id);
                    while (parentDirectory.length > 0) {
                        parentDirectory.show();
                        parentDirectory = parentDirectory.parents('.directory').first();
                    }
                });
            }
        });
}