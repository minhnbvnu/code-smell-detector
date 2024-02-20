function delete_note(_item, cid) {
    if (_item === undefined || _item === null) {
        _item = $('#currentNoteIDLabel').data('note_id')
    }

    do_deletion_prompt("You are about to delete note #" + _item)
    .then((doDelete) => {
        if (doDelete) {
            post_request_api('/case/notes/delete/' + _item, null, null, cid)
            .done((data) => {
               if (notify_auto_api(data)) {
                   load_directories()
                       .then((data) =>
                       {
                           let shared_id = getSharedLink();
                            if (shared_id) {
                                note_detail(shared_id).then((data) => {
                                    if (!data) {
                                        setSharedLink(null);
                                        toggleNoteEditor(false);
                                    }
                                });
                            }
                       }
                   )
               }
            })
        }
    });
}