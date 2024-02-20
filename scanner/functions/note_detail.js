async function note_detail(id) {

    get_request_api('/case/notes/' + id)
    .done((data) => {
        if (notify_auto_api(data, true, true)) {
            let timer;
            let timeout = 10000;
            $('#form_note').keyup(function(){
                if(timer) {
                     clearTimeout(timer);
                }
                if (ppl_viewing.size <= 1) {
                    timer = setTimeout(save_note, timeout);
                }
            });

            note_id = id;

            if (collaborator !== null) {
                collaborator.close(note_id);
            }

            collaborator = new Collaborator( get_caseid() );

            // Destroy the note editor if it exists
            if (note_editor !== undefined && note_editor !== null) {
                note_editor.destroy();
                note_editor = null;
            }

            note_editor = get_new_ace_editor('editor_detail', 'note_content', 'targetDiv', function () {
                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                $('#btn_save_note').text("Save").removeClass('btn-success').addClass('btn-warning').removeClass('btn-danger');
            }, save_note);

            note_editor.focus();

            note_editor.setValue(data.data.note_content, -1);
            $('#currentNoteTitle').text(data.data.note_title);
            previousNoteTitle = data.data.note_title;
            $('#currentNoteIDLabel').text(`#${data.data.note_id} - ${data.data.note_uuid}`)
                .data('note_id', data.data.note_id);

            note_editor.on( "change", function( e ) {
                if( last_applied_change != e && note_editor.curOp && note_editor.curOp.command.name) {
                    console.log('Change detected - signaling teammates');
                    collaborator.change( JSON.stringify(e), note_id ) ;
                }
                }, false
            );
            last_applied_change = null ;
            just_cleared_buffer = false ;

            load_menu_mod_options_modal(id, 'note', $("#note_modal_quick_actions"));

            collaborator_socket.emit('ping-note', { 'channel': 'case-' + get_caseid() + '-notes', 'note_id': note_id });

            toggleNoteEditor(true);

            $('.note').removeClass('note-highlight');
            $('#note-' + id).addClass('note-highlight');

            $('#object_comments_number').text(data.data.comments.length);
            $('#content_last_saved_by').text('');
            $('#content_typing').text('');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");

            setSharedLink(id);

            return true;
        } else {
            setSharedLink();
            return false;
        }

    });
}