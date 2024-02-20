function refresh_folders() {
    load_directories().then(function() {
        notify_success('Tree  refreshed');
        let note_id = $('#currentNoteIDLabel').data('note_id');
        $('.note').removeClass('note-highlight');
        $('#note-' + note_id).addClass('note-highlight');
    });
}