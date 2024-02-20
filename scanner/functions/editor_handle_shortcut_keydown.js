function editor_handle_shortcut_keydown (evt) {
        var elem = $(evt.delegateTarget);
        if (!only_modifier_event(evt)) {
            var shortcut = keyboard.normalize_shortcut(keyboard.event_to_shortcut(evt));
            var editor = elem.closest('#kse-editor');
            var seq = editor.data('kse_sequence');
            var has_undefined_key = (shortcut.toLowerCase().indexOf('undefined') !== -1);
            editor.data('kse_undefined_key', has_undefined_key);
            if (has_undefined_key) {
                // deal with things like ~ appearing on apple alt-n, or ¨ on alt-u
                editor.find('.kse-input-group-input').val('');
                editor.data('kse_undefined_key', evt.which || true);
            }
            else {
                seq.push(shortcut);
            }
            editor_update_input_group(editor, seq);
        }
    }