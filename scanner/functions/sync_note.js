async function sync_note(node_id) {
    // Get the remote note
    let remote_note = await get_remote_note(node_id);
    if (remote_note.status !== 'success') {
        return;
    }

    // Get the local note
    let local_note = note_editor.getValue();

    // If the local note is empty, set it to the remote note
    if (local_note === '') {
        note_editor.setValue(remote_note.data.note_content, -1);
        return;
    }

    // If the local note is not empty, check if it is different from the remote note
    if (local_note !== remote_note.data.note_content) {
        swal({
            title: 'Note conflict',
            text: 'The note has been saved by someone else. Do you want to overwrite your changes?',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true,
                },
                confirm: {
                    text: 'Overwrite',
                    value: true,
                }
            },
            dangerMode: true,
            closeOnEsc: false,
            allowOutsideClick: false,
            allowEnterKey: false
        })
            .then((overwrite) => {
                if (overwrite) {
                    // Overwrite the local note with the remote note
                    note_editor.setValue(remote_note.data.note_content, -1);
                }
            });
    }

    return;
}